import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDivipolaCountryDto } from './dto/create-divipola_country.dto';
import { UpdateDivipolaCountryDto } from './dto/update-divipola_country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DivipolaCountry } from './entities/divipola_country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DivipolaCountriesService {
  constructor(
    @InjectRepository(DivipolaCountry)
    private readonly divCountryRepository: Repository<DivipolaCountry>,
  ) {}

  async create(createDivipolaCountryDto: CreateDivipolaCountryDto) {
    const divCountry = this.divCountryRepository.create(
      createDivipolaCountryDto,
    );
    return await this.divCountryRepository.save(divCountry);
  }

  findAll() {
    return this.divCountryRepository.find();
  }

  async findOne(id: number) {
    const divCountry = await this.divCountryRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!divCountry) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return divCountry;
  }

  async update(id: number, updateDivipolaCountryDto: UpdateDivipolaCountryDto) {
    await this.findOne(id);
    return await this.divCountryRepository.update(id, updateDivipolaCountryDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.divCountryRepository.softDelete(id);
  }
}
