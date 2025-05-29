import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DivipolaCountriesService } from './divipola_countries.service';
import { CreateDivipolaCountryDto } from './dto/create-divipola_country.dto';
import { UpdateDivipolaCountryDto } from './dto/update-divipola_country.dto';

@Controller('divipola-countries')
export class DivipolaCountriesController {
  constructor(
    private readonly divipolaCountriesService: DivipolaCountriesService,
  ) {}

  @Post()
  create(@Body() createDivipolaCountryDto: CreateDivipolaCountryDto) {
    return this.divipolaCountriesService.create(createDivipolaCountryDto);
  }

  @Get()
  findAll() {
    return this.divipolaCountriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divipolaCountriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivipolaCountryDto: UpdateDivipolaCountryDto,
  ) {
    return this.divipolaCountriesService.update(+id, updateDivipolaCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divipolaCountriesService.remove(+id);
  }
}
