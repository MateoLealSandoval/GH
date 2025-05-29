import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDivipolaMunicipalityDto } from './dto/create-divipola_municipality.dto';
import { UpdateDivipolaMunicipalityDto } from './dto/update-divipola_municipality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DivipolaMunicipality } from './entities/divipola_municipality.entity';

@Injectable()
export class DivipolaMunicipalitiesService {
  constructor(
    @InjectRepository(DivipolaMunicipality)
    private readonly divMunRepository: Repository<DivipolaMunicipality>,
  ) {}

  async create(createDivipolaMunicipalityDto: CreateDivipolaMunicipalityDto) {
    const divMunicipality = this.divMunRepository.create(
      createDivipolaMunicipalityDto,
    );
    return await this.divMunRepository.save(divMunicipality);
  }

  findAll() {
    return this.divMunRepository.find();
  }

  async findOne(id: number) {
    const divMunicipality = await this.divMunRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!divMunicipality) {
      throw new NotFoundException(`Municipalities with id ${id} not found`);
    }

    return divMunicipality;
  }

  async update(
    id: number,
    updateDivipolaMunicipalityDto: UpdateDivipolaMunicipalityDto,
  ) {
    await this.findOne(id);
    return await this.divMunRepository.update(
      id,
      updateDivipolaMunicipalityDto,
    );
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.divMunRepository.softDelete(id);
  }
}
