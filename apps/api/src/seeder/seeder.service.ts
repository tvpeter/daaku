import { SessionSeederService } from '@app/sessions/session.seeder.service';
import { StudentClassSeederService } from '@app/studentclass/studentclass.seeder.service';
import { StudentSeederService } from '@app/students/student.seeder.service';
import { UsersSeederService } from '@app/users/users.seeder.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly sessionSeederService: SessionSeederService,
    private readonly studentSeederService: StudentSeederService,
    private readonly studentclassSeederService: StudentClassSeederService,
    private readonly userSeederService: UsersSeederService,
  ) {}
  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    await this.sessionSeederService.seed();
    await this.studentclassSeederService.seed();
    await this.userSeederService.seed();
    await this.studentSeederService.seed();
  }
}