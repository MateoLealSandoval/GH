import { Module } from '@nestjs/common';
import { MasterListsService } from './master_lists.service';
import { MasterListsController } from './master_lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterList } from './entities/master_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterList])],
  controllers: [MasterListsController],
  providers: [MasterListsService],
})
export class MasterListsModule {}
