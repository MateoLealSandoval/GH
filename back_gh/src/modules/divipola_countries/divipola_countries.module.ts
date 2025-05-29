import { Module } from '@nestjs/common';
import { DivipolaCountriesService } from './divipola_countries.service';
import { DivipolaCountriesController } from './divipola_countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivipolaCountry } from './entities/divipola_country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DivipolaCountry])],
  controllers: [DivipolaCountriesController],
  providers: [DivipolaCountriesService],
  exports: [DivipolaCountriesService],
})
export class DivipolaCountriesModule { }
