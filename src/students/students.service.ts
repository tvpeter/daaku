import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);

    return await this.studentRepository.save(newStudent);
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: number) {
    return await this.studentRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    return await this.studentRepository.save({
      ...student,
      ...updateStudentDto,
    });
  }

  async remove(id: number) {
    const student = await this.findOne(id);

    return this.studentRepository.remove(student);
  }
}
