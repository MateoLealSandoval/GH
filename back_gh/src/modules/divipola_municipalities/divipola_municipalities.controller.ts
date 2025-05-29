import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DivipolaMunicipalitiesService } from './divipola_municipalities.service';
import { CreateDivipolaMunicipalityDto } from './dto/create-divipola_municipality.dto';
import { UpdateDivipolaMunicipalityDto } from './dto/update-divipola_municipality.dto';

@Controller('divipola-municipalities')
export class DivipolaMunicipalitiesController {
  constructor(
    private readonly divipolaMunicipalitiesService: DivipolaMunicipalitiesService,
  ) {}

  @Post()
  create(@Body() createDivipolaMunicipalityDto: CreateDivipolaMunicipalityDto) {
    return this.divipolaMunicipalitiesService.create(
      createDivipolaMunicipalityDto,
    );
  }

  @Get()
  findAll() {
    return this.divipolaMunicipalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divipolaMunicipalitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivipolaMunicipalityDto: UpdateDivipolaMunicipalityDto,
  ) {
    return this.divipolaMunicipalitiesService.update(
      +id,
      updateDivipolaMunicipalityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divipolaMunicipalitiesService.remove(+id);
  }
}
