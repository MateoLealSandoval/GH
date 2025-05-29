import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDivipolaDepartmentDto } from './dto/create-divipola_department.dto';
import { UpdateDivipolaDepartmentDto } from './dto/update-divipola_department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DivipolaDepartment } from './entities/divipola_department.entity';

@Injectable()
export class DivipolaDepartmentsService {
  constructor(
    @InjectRepository(DivipolaDepartment)
    private readonly divDepRepository: Repository<DivipolaDepartment>,
  ) {}

  async create(createDivipolaDepartmentDto: CreateDivipolaDepartmentDto) {
    const divDepartament = this.divDepRepository.create(
      createDivipolaDepartmentDto,
    );
    return await this.divDepRepository.save(divDepartament);
  }

  findAll() {
    return this.divDepRepository.find();
  }

  async findOne(id: number) {
    const divDepartament = await this.divDepRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!divDepartament) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return divDepartament;
  }

  async update(
    id: number,
    updateDivipolaDepartmentDto: UpdateDivipolaDepartmentDto,
  ) {
    await this.findOne(id);
    return await this.divDepRepository.update(id, updateDivipolaDepartmentDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.divDepRepository.softDelete(id);
  }
}
