import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MasterListsService } from './master_lists.service';
import { CreateMasterListDto } from './dto/create-master_list.dto';
import { UpdateMasterListDto } from './dto/update-master_list.dto';

@Controller('master-lists')
export class MasterListsController {
  constructor(private readonly masterListsService: MasterListsService) {}

  @Post()
  create(@Body() createMasterListDto: CreateMasterListDto) {
    return this.masterListsService.create(createMasterListDto);
  }

  @Get()
  findAll(@Query('inactive') inactive?: string) {
    const includeInactive = inactive !== undefined;
    return this.masterListsService.findAll(includeInactive);
  }

  @Get('type')
  findByType(@Query('type') type: string) {
    return this.masterListsService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.masterListsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterListDto: UpdateMasterListDto,
  ) {
    return this.masterListsService.update(+id, updateMasterListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterListsService.remove(+id);
  }
}
