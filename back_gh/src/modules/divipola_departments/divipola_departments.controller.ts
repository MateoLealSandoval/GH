import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DivipolaDepartmentsService } from './divipola_departments.service';
import { CreateDivipolaDepartmentDto } from './dto/create-divipola_department.dto';
import { UpdateDivipolaDepartmentDto } from './dto/update-divipola_department.dto';

@Controller('divipola-departments')
export class DivipolaDepartmentsController {
  constructor(
    private readonly divipolaDepartmentsService: DivipolaDepartmentsService,
  ) {}

  @Post()
  create(@Body() createDivipolaDepartmentDto: CreateDivipolaDepartmentDto) {
    return this.divipolaDepartmentsService.create(createDivipolaDepartmentDto);
  }

  @Get()
  findAll() {
    return this.divipolaDepartmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divipolaDepartmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivipolaDepartmentDto: UpdateDivipolaDepartmentDto,
  ) {
    return this.divipolaDepartmentsService.update(
      +id,
      updateDivipolaDepartmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divipolaDepartmentsService.remove(+id);
  }
}
