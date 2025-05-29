import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async createOrFindSkill(@Body() dto: CreateSkillDto): Promise<{
    created: boolean;
    caseId: number;
    caseDescription: string;
    skill: Omit<Skill, 'embedding'>;
  }> {
    return this.skillsService.validateAndSaveSkill(dto);
  }

  @Get()
  async findAll(@Query() query: Record<string, string>) {
    const allowedParams = ['creator', 'status', 'type'];

    const invalidParams = Object.keys(query).filter(
      (key) => !allowedParams.includes(key),
    );
    if (invalidParams.length > 0) {
      throw new BadRequestException(
        `Parámetros inválidos: ${invalidParams.join(', ')}`,
      );
    }

    const filters: {
      creator?: 'AI' | 'human';
      status?: 'pending' | 'valid' | 'verified' | 'rejected';
      type?: 'technical' | 'soft';
    } = {};

    if (query.creator) filters.creator = query.creator as 'AI' | 'human';
    if (query.status)
      filters.status = query.status as
        | 'pending'
        | 'valid'
        | 'verified'
        | 'rejected';
    if (query.type) filters.type = query.type as 'technical' | 'soft';

    return this.skillsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Patch(':id/verify')
  async verify(@Param('id') id: number) {
    return this.skillsService.verifySkill(id);
  }

  @Patch(':id/deprecate')
  async deprecate(@Param('id') id: number) {
    return this.skillsService.deprecateSkill(id);
  }
}
