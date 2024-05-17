import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentclassDto } from './dto/create-studentclass.dto';
import { UpdateStudentclassDto } from './dto/update-studentclass.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentclassService {
  constructor(
    @InjectRepository(Studentclass)
    private readonly studentClassRepository: Repository<Studentclass>,
  ) {}

  async create(createStudentclassDto: CreateStudentclassDto) {
    const newStudentClass = this.studentClassRepository.create(
      createStudentclassDto,
    );

    return await this.studentClassRepository.save(newStudentClass);
  }

  async findAll() {
    return await this.studentClassRepository.find();
  }

  async findOne(id: number) {
    return await this.studentClassRepository.findOneOrFail({ where: { id } });
  }

  async findByName(name: string) {
    return await this.studentClassRepository.findOneBy({ name });
  }

  async update(id: number, updateStudentclassDto: UpdateStudentclassDto) {
    const studentClass = await this.findOne(id);
    return await this.studentClassRepository.save({
      ...studentClass,
      ...updateStudentclassDto,
    });
  }

  async remove(id: number) {
    const studentClass = await this.studentClassRepository.findOne({
      where: { id },
    });
    if (!studentClass) throw new NotFoundException('Given class not found');
    return this.studentClassRepository.remove(studentClass);
  }
}
