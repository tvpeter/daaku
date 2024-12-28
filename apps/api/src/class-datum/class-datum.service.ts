import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDatumDto } from './dto/create-class-datum.dto';
import { UpdateClassDatumDto } from './dto/update-class-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassDatum } from './entities/class-datum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassDatumService {
  constructor(
    @InjectRepository(ClassDatum)
    private readonly classDatumRepository: Repository<ClassDatum>,
  ) {}

  async create(createClassDatumDto: CreateClassDatumDto) {
    const { session_id, class_id } = createClassDatumDto;

    const checkSessionExists = await this.checkSessionExists(
      session_id,
      class_id,
    );

    if (checkSessionExists) {
      throw new ConflictException('Class data already exists');
    }
    const newClassDatum = this.classDatumRepository.create(createClassDatumDto);
    return await this.classDatumRepository.save(newClassDatum);
  }

  async findAll() {
    return await this.classDatumRepository.find();
  }

  async findOne(id: number) {
    const classData = await this.classDatumRepository.findOne({
      where: { id },
    });

    if (!classData) throw new NotFoundException('Class data not found');
    return classData;
  }

  async update(id: number, updateClassDatumDto: UpdateClassDatumDto) {
    const classData = await this.findOne(id);
    return await this.classDatumRepository.save({
      ...classData,
      ...updateClassDatumDto,
    });
  }

  async remove(id: number) {
    const classData = await this.findOne(id);
    return await this.classDatumRepository.softRemove(classData);
  }

  async checkSessionExists(
    session_id: number,
    class_id: number,
  ): Promise<boolean> {
    const sessionExists = await this.classDatumRepository.findOne({
      where: { session_id, class_id },
    });

    if (sessionExists) return true;

    return false;
  }
}
