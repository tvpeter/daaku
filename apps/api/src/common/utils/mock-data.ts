import {
  AccountStatus,
  AnnouncementStatus,
  Banks,
  Gender,
  ResultStatusEnum,
  SchoolTerm,
  SessionStatus,
  UserRole,
  UserStatus,
} from '@app/common/enums';
import { Announcement } from '@app/announcements/entities/announcement.entity';
import { User } from '@app/users/entities/user.entity';
import { Account } from '@app/accounts/entities/account.entity';
import { CreateAnnouncementDto } from '@app/announcements/dto/create-announcement.dto';
import { omit } from 'lodash';
import { CreateAccountDto } from '@app/accounts/dto/create-account.dto';
import { Session } from '@app/sessions/entities/session.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { ResultStatus } from '@app/result-status/entities/result-status.entity';
import { Subject } from '@app/subjects/entities/subject.entity';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { CreateSessionDto } from '@app/sessions/dto/create-session.dto';
import { Student } from '@app/students/entities/student.entity';
import { faker } from '@faker-js/faker';
import { SessionClassTeacher } from '@app/session-class-teacher/entities/session-class-teacher.entity';
import { CreateStudentDto } from '@app/students/dto/create-student.dto';
import { StudentSubjectRegistration } from '@app/student-subject-registration/entities/student-subject-registration.entity';
import { CreateStudentSubjectRegistrationDto } from '@app/student-subject-registration/dto/create-student-subject-registration.dto';
import { ClassDatum } from '@app/class-datum/entities/class-datum.entity';
import { CreateClassDatumDto } from '@app/class-datum/dto/create-class-datum.dto';

export const createMockUser = (): User => {
  return {
    id: 1,
    name: faker.person.fullName(),
    username: faker.person.firstName(),
    password: `Test_User_password`,
    sig_url: faker.internet.url(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    status: UserStatus.ACTIVE,
    token: faker.string.alphanumeric(32),
    studentClass: [],
    announcements: [],
    role: UserRole.ADMIN,
    accounts: [],
    sessionClassTeacher: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const createMockAccount = (
  id: number = 1,
  user: User = createMockUser(),
): Account => {
  return {
    id,
    bank: Banks.FIRST,
    account_name: `Test account name for ${id}`,
    account_number: 10000100010,
    status: AccountStatus.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
    user_id: user.id,
    user,
  };
};

export const extractCreateAccountDTO = (account: Account): CreateAccountDto => {
  return omit(account, [
    'id',
    'user',
    'created_at',
    'updated_at',
  ]) as CreateAccountDto;
};

export const createMockAnnouncement = (
  id: number = 1,
  user: User = createMockUser(),
): Announcement => {
  return {
    id,
    topic: `Test Topic ${id}`,
    body: `Test Body ${id}`,
    status: AnnouncementStatus.UNPUBLISHED,
    user_id: user.id,
    user,
    created_at: new Date(),
    updated_at: new Date(),
  } as Announcement;
};

export const extractCreateAnnouncementDto = (
  announcement: Announcement,
): CreateAnnouncementDto => {
  return omit(announcement, [
    'id',
    'user',
    'created_at',
    'updated_at',
  ]) as CreateAnnouncementDto;
};

export const mockJwtPayload = () => {
  return {
    userId: 1,
    username: 'test',
    role: UserRole.STAFF,
  };
};

export const mockSession = (): Session => {
  return {
    id: 1,
    name: '2020/2021',
    status: SessionStatus.OPEN,
    resultStatus: [],
    scores: [],
    combineScores: [],
    scoreMetaData: [],
    results: [],
    studentSessionClass: [],
    sessionClassTeacher: [],
    studentSubjects: [],
    classData: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const mockSessionDTO = (
  session: Session = mockSession(),
): CreateSessionDto => {
  return {
    name: session.name,
    status: session.status,
  };
};
export const mockStudentClass = (
  user: User = createMockUser(),
): Studentclass => {
  return {
    id: 1,
    name: 'JSS 1A',
    result_status: [],
    scores: [],
    scoreMetaData: [],
    results: [],
    user_id: user.id,
    user,
    combineScore: [],
    studentSessionClass: [],
    sessionClassTeacher: [],
    studentSubjects: [],
    classData: [],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };
};

export const mockResultStatus = (
  session: Session = mockSession(),
  studentClass: Studentclass = mockStudentClass(),
): ResultStatus => {
  return {
    id: 1,
    term: SchoolTerm.TERM_I,
    result_status: ResultStatusEnum.PROCESSING,
    session_id: session.id,
    session,
    class_id: studentClass.id,
    studentClass,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
export const mockSubject = (): Subject => {
  return {
    id: 1,
    name: 'subject name',
    scores: [],
    combineScore: [],
    scoreMetaData: [],
    studentSubjects: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const mockScoreMetaData = (
  studentClass: Studentclass = mockStudentClass(),
  subject: Subject = mockSubject(),
  session: Session = mockSession(),
): ScoreMetaDatum => {
  return {
    id: 1,
    total_students: 60,
    term: SchoolTerm.TERM_I,
    class_avg: 65.9,
    lowest_score: 9,
    highest_score: 90.2,
    class_id: studentClass.id,
    studentClass,
    subject_id: subject.id,
    subject,
    session_id: session.id,
    session,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };
};

export const mockStudent = (): Student => {
  return {
    id: 1,
    name: faker.person.fullName(),
    admission_number: '11111',
    dob: faker.date.past().toISOString(),
    gender: Gender.MALE,
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    passport_url: faker.internet.url(),
    scores: [],
    combineScore: [],
    results: [],
    studentSessionClass: [],
    studentSubjects: [],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };
};

export const mockStudentDTO = (
  student: Student = mockStudent(),
  session: Session = mockSession(),
  studentClass: Studentclass = mockStudentClass(),
): CreateStudentDto => {
  return {
    session_id: session.id,
    class_id: studentClass.id,
    name: student.name,
    admission_number: student.admission_number,
    dob: student.dob,
    gender: student.gender,
    address: student.address,
    phone: student.phone,
    email: student.email,
    passport_url: student.passport_url,
  };
};

export const mockSessionClassTeacher = (
  session: Session = mockSession(),
  studentClass: Studentclass = mockStudentClass(),
  user: User = createMockUser(),
): SessionClassTeacher => {
  return {
    id: 1,
    session_id: session.id,
    class_id: studentClass.id,
    user_id: user.id,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    session: session,
    studentClass,
    teacher: user,
  };
};

export const mockStudentSubjectReg = (
  student: Student = mockStudent(),
  studentClass: Studentclass = mockStudentClass(),
  session: Session = mockSession(),
  subject: Subject = mockSubject(),
): StudentSubjectRegistration => {
  return {
    id: 1,
    student_id: student.id,
    class_id: studentClass.id,
    session_id: session.id,
    subject_id: subject.id,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    student: new Student(),
    studentClass: new Studentclass(),
    session: new Session(),
    subject: new Subject(),
  };
};

export const mockStudentSubjectRegDTO = (
  studentSubject: StudentSubjectRegistration = mockStudentSubjectReg(),
): CreateStudentSubjectRegistrationDto => {
  return {
    student_id: studentSubject.session_id,
    class_id: studentSubject.class_id,
    session_id: studentSubject.session_id,
    subject_id: studentSubject.subject_id,
  };
};

export const mockClassDatum = (
  studentClass: Studentclass = mockStudentClass(),
  session: Session = mockSession(),
): ClassDatum => {
  return {
    id: 1,
    class_id: studentClass.id,
    session_id: session.id,
    total_subjects: 10,
    total_students: 60,
    created_at: new Date(),
    updated_at: new Date(),
    studentClass,
    session,
  };
};

export const mockClassDataDTO = (
  classData: ClassDatum = mockClassDatum(),
): CreateClassDatumDto => {
  return {
    class_id: classData.class_id,
    session_id: classData.session_id,
    total_subjects: classData.total_subjects,
    total_students: classData.total_students,
  };
};
