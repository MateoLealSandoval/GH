import { Module } from '@nestjs/common';
import { DivipolaDepartmentsService } from './divipola_departments.service';
import { DivipolaDepartmentsController } from './divipola_departments.controller';
import { DivipolaDepartment } from './entities/divipola_department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DivipolaDepartment])],
  controllers: [DivipolaDepartmentsController],
  providers: [DivipolaDepartmentsService],
  exports: [DivipolaDepartmentsService],
})
export class DivipolaDepartmentsModule {}
