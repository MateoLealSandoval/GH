import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMasterListDto } from './dto/create-master_list.dto';
import { UpdateMasterListDto } from './dto/update-master_list.dto';
import { MasterList } from './entities/master_list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MasterListsService {
  constructor(
    @InjectRepository(MasterList)
    private readonly masterListRepository: Repository<MasterList>,
  ) {}

  async create(createMasterListDto: CreateMasterListDto): Promise<MasterList> {
    const { type, value } = createMasterListDto;

    const exists = await this.masterListRepository.findOneBy({ type, value });
    if (exists) {
      throw new BadRequestException(
        `Ya existe un valor "${value}" para el tipo "${type}"`,
      );
    }

    const maxCode = await this.masterListRepository
      .createQueryBuilder('c')
      .select('MAX(c.code)', 'max')
      .where('c.type = :type', { type })
      .getRawOne();

    const newCode = (maxCode?.max ?? 0) + 1;

    const newItem = this.masterListRepository.create({
      type,
      value,
      code: newCode,
      isActive: true,
    });

    return this.masterListRepository.save(newItem);
  }

  async findAll(includeInactive?: boolean) {
    const whereCondition = includeInactive ? {} : { isActive: true };
    return this.masterListRepository.find({ where: whereCondition });
  }

  async findOne(id: number) {
    const item = await this.masterListRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  async findByType(type: string): Promise<MasterList[]> {
    return this.masterListRepository.find({ where: { type, isActive: true } });
  }

  async update(id: number, dto: UpdateMasterListDto): Promise<MasterList> {
    const item = await this.masterListRepository.findOneBy({ id });
    if (!item) throw new NotFoundException('Not found item in Master list');

    Object.assign(item, dto);
    return this.masterListRepository.save(item);
  }

  async remove(id: number): Promise<MasterList> {
    const item = await this.masterListRepository.findOneBy({ id });
    if (!item) throw new NotFoundException('Not found item in Master list');

    item.isActive = false;
    return this.masterListRepository.save(item);
  }
}
