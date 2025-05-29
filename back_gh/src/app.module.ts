import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './config/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MasterListsModule } from './modules/master_lists/master_lists.module';
import { SkillsModule } from './modules/skills/skills.module';
import { CompanyModule } from './modules/company/company.module';
import { DivipolaCountriesModule } from './modules/divipola_countries/divipola_countries.module';
import { DivipolaDepartmentsModule } from './modules/divipola_departments/divipola_departments.module';
import { DivipolaMunicipalitiesModule } from './modules/divipola_municipalities/divipola_municipalities.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    MasterListsModule,
    SkillsModule,
    CompanyModule,
    DivipolaCountriesModule,
    DivipolaDepartmentsModule,
    DivipolaMunicipalitiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
