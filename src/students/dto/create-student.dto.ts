import { Gender } from '../types/gender.types';

export class CreateStudentDto {
  name: string;

  admission_number: string;

  dob: string;

  gender: Gender;

  address: string;

  phone: string;

  email: string;

  passport_url: string;
}

// `name` varchar(35) NOT NULL,
// //     `admno` varchar(10) DEFAULT NULL,
// //     `dob` varchar(14) DEFAULT NULL,
// //     `sex` varchar(6) DEFAULT NULL,
// //     `address` varchar(70) DEFAULT NULL,
// //     `phone` varchar(15) DEFAULT NULL,
// //     `email` varchar(35) DEFAULT NULL,
// //     `passport` varchar(100) DEFAULT NULL,
// //     `class` varchar(15) DEFAULT NULL,
// //     `dater` varchar(14) DEFAULT NULL,
// //     `session` varchar(9) DEFAULT NULL
