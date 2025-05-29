import { Module } from '@nestjs/common';
import { DivipolaMunicipalitiesService } from './divipola_municipalities.service';
import { DivipolaMunicipalitiesController } from './divipola_municipalities.controller';
import { DivipolaMunicipality } from './entities/divipola_municipality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DivipolaMunicipality])],
  controllers: [DivipolaMunicipalitiesController],
  providers: [DivipolaMunicipalitiesService],
  exports: [DivipolaMunicipalitiesService],
})
export class DivipolaMunicipalitiesModule {}
