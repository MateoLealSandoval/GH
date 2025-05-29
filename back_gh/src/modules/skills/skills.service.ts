import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as levenshtein from 'fast-levenshtein';

import { Skill, SkillType } from './entities/skill.entity';
import { OpenAIService } from '../ai/openia.service';
import { normalizeSkillName } from './utils/skill.utils';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    private readonly openAIService: OpenAIService,
  ) {}

  async validateAndSaveSkill(createSkillDto: CreateSkillDto): Promise<{
    created: boolean;
    caseId: number;
    caseDescription: string;
    skill: Omit<Skill, 'embedding'>;
  }> {
    const { name, type, createdbyAI } = createSkillDto;
    const { normalized, embedding } = await this.normalizeAndEmbedSkill(name);
    const { duplicateSkill, flagged, verified } = await this.prepareSkillFlags(
      normalized,
      embedding,
      type,
      createdbyAI,
    );

    if (duplicateSkill) {
      const { embedding, ...skillWithoutEmbedding } = duplicateSkill;
      return {
        created: false,
        ...this.getCase(duplicateSkill),
        skill: skillWithoutEmbedding,
      };
    }

    const skill = this.skillRepo.create({
      name,
      normalizedName: normalized,
      embedding,
      type,
      createdbyAI,
      flaggedForReview: flagged,
      verified: verified,
      deprecated: false,
    });

    const saved = await this.skillRepo.save(skill);
    const { embedding: _, ...skillWithoutEmbedding } = saved;
    return {
      created: true,
      ...this.getCase(saved),
      skill: skillWithoutEmbedding,
    };
  }

  async verifySkill(id: number): Promise<Skill> {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) throw new NotFoundException('Skill no encontrada');

    skill.flaggedForReview = false;
    skill.verified = true;
    skill.deprecated = false;

    return this.skillRepo.save(skill);
  }

  async deprecateSkill(id: number): Promise<Skill> {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) throw new NotFoundException('Skill no encontrada');

    skill.flaggedForReview = false;
    skill.verified = true;
    skill.deprecated = true;

    return this.skillRepo.save(skill);
  }

  async findAll(filter?: {
    creator?: 'AI' | 'human';
    status?: 'pending' | 'valid' | 'verified' | 'rejected';
    type?: 'technical' | 'soft';
  }): Promise<Omit<Skill, 'embedding'>[]> {
    if (!filter || Object.keys(filter).length === 0) {
      // Sin filtros, retorna todos
      return this.skillRepo.find({
        select: [
          'id',
          'name',
          'normalizedName',
          'type',
          'createdbyAI',
          'flaggedForReview',
          'verified',
          'deprecated',
          'createdAt',
        ],
      });
    }

    // Validación estricta
    if (filter.creator && !['AI', 'human'].includes(filter.creator)) {
      throw new BadRequestException('Creator no válido');
    }
    if (
      filter.status &&
      !['pending', 'valid', 'verified', 'rejected'].includes(filter.status)
    ) {
      throw new BadRequestException('Status no válido');
    }
    if (filter.type && !['technical', 'soft'].includes(filter.type)) {
      throw new BadRequestException('Tipo no válido');
    }

    const query = this.skillRepo.createQueryBuilder('skill');

    if (filter.creator) {
      query.andWhere('skill.createdbyAI = :createdbyAI', {
        createdbyAI: filter.creator === 'AI',
      });
    }

    if (filter.status) {
      switch (filter.status) {
        case 'pending':
          query.andWhere(
            'skill.flaggedForReview = :flagged AND skill.verified = :verified AND skill.deprecated = :deprecated',
            {
              flagged: true,
              verified: false,
              deprecated: false,
            },
          );
          break;
        case 'valid':
          query.andWhere(
            'skill.flaggedForReview = :flagged AND skill.verified = :verified AND skill.deprecated = :deprecated',
            {
              flagged: false,
              verified: false,
              deprecated: false,
            },
          );
          break;
        case 'verified':
          query.andWhere(
            'skill.flaggedForReview = :flagged AND skill.verified = :verified AND skill.deprecated = :deprecated',
            {
              flagged: false,
              verified: true,
              deprecated: false,
            },
          );
          break;
        case 'rejected':
          query.andWhere(
            'skill.flaggedForReview = :flagged AND skill.verified = :verified AND skill.deprecated = :deprecated',
            {
              flagged: false,
              verified: true,
              deprecated: true,
            },
          );
          break;
      }
    }

    if (filter.type) {
      query.andWhere('skill.type = :type', {
        type:
          filter.type === 'technical' ? SkillType.TECHNICAL : SkillType.SOFT,
      });
    }

    query.select([
      'skill.id',
      'skill.name',
      'skill.normalizedName',
      'skill.type',
      'skill.createdbyAI',
      'skill.flaggedForReview',
      'skill.verified',
      'skill.deprecated',
      'skill.createdAt',
    ]);

    return query.getMany();
  }

  async findOne(id: number): Promise<Omit<Skill, 'embedding'>> {
    const skill = await this.skillRepo.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'normalizedName',
        'type',
        'createdbyAI',
        'flaggedForReview',
        'verified',
        'deprecated',
        'createdAt',
      ],
    });
    if (!skill) {
      throw new NotFoundException(`Skill con id ${id} no encontrada`);
    }
    return skill;
  }

  async update(
    id: number,
    updateSkillDto: UpdateSkillDto,
  ): Promise<Omit<Skill, 'embedding'>> {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill con id ${id} no encontrada`);
    }

    if (updateSkillDto.name) {
      const { normalized, embedding } = await this.normalizeAndEmbedSkill(
        updateSkillDto.name,
      );
      skill.name = updateSkillDto.name;
      skill.normalizedName = normalized;
      skill.embedding = embedding;

      if (skill.createdbyAI) {
        const { flagged } = await this.prepareSkillFlags(
          normalized,
          embedding,
          skill.type,
          true,
          skill.id,
        );
        this.applyUpdateFlags(skill, flagged);
      }
    }

    if (updateSkillDto.type) {
      skill.type = updateSkillDto.type;
    }

    const updated = await this.skillRepo.save(skill);
    const { embedding, ...skillWithoutEmbedding } = updated;
    return skillWithoutEmbedding;
  }

  private async normalizeAndEmbedSkill(
    name: string,
  ): Promise<{ normalized: string; embedding: number[] }> {
    const normalized = normalizeSkillName(name);
    const embedding = await this.openAIService.getEmbedding(normalized);
    return { normalized, embedding };
  }

  private async prepareSkillFlags(
    normalized: string,
    embedding: number[],
    type: SkillType,
    createdbyAI: boolean,
    skillIdToExclude?: number,
  ): Promise<{ duplicateSkill?: Skill; flagged: boolean; verified: boolean }> {
    const skills = await this.skillRepo.find({
      where: { type },
      select: [
        'id',
        'embedding',
        'normalizedName',
        'name',
        'flaggedForReview',
        'verified',
        'deprecated',
        'createdbyAI',
        'type',
        'createdAt',
      ],
    });

    let duplicateSkill: Skill | undefined = undefined;
    let flagged = false;
    let verified = false;

    for (const existingSkill of skills) {
      if (skillIdToExclude && existingSkill.id === skillIdToExclude) continue;
      if (!existingSkill.embedding) continue;

      const dist = levenshtein.get(normalized, existingSkill.normalizedName);
      const maxLen = Math.max(
        normalized.length,
        existingSkill.normalizedName.length,
      );
      const textSim = 1 - dist / maxLen;
      const semanticSim = this.openAIService.cosineSimilarity(
        embedding,
        existingSkill.embedding,
      );

      if (textSim >= 0.8) {
        duplicateSkill = existingSkill;
        break;
      }

      if (semanticSim >= 0.55 && textSim < 0.5) {
        flagged = true;
      }

      if (semanticSim >= 0.7 && textSim >= 0.6) {
        verified = true;
      }
    }

    if (normalized.length <= 4) {
      flagged = true;
    }

    if (createdbyAI) {
      flagged = true; // Siempre revisar skills creadas por IA
    }

    return { duplicateSkill, flagged, verified: createdbyAI ? verified : true };
  }

  private applyUpdateFlags(skill: Skill, flagged: boolean) {
    skill.flaggedForReview = flagged;
    skill.verified = !flagged;
    skill.deprecated = false;
  }

  private getCase(skill: Skill): { caseId: number; caseDescription: string } {
    if (skill.flaggedForReview && !skill.verified && !skill.deprecated) {
      return { caseId: 1, caseDescription: 'Skill pendiente de revisión' };
    }
    if (!skill.flaggedForReview && !skill.verified && !skill.deprecated) {
      return { caseId: 2, caseDescription: 'Skill válida sin revisión' };
    }
    if (!skill.flaggedForReview && skill.verified && !skill.deprecated) {
      return { caseId: 3, caseDescription: 'Skill verificada' };
    }
    if (!skill.flaggedForReview && skill.verified && skill.deprecated) {
      return { caseId: 4, caseDescription: 'Skill rechazada' };
    }
    if (skill.flaggedForReview && skill.verified && !skill.deprecated) {
      return {
        caseId: 5,
        caseDescription: 'Skill verificada pero pendiente de revisión',
      };
    }

    throw new Error('Estado de skill no reconocido');
  }
}
