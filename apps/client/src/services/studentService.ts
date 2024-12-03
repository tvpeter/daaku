import httpService from "./httpService";
import { SchoolSession } from "./sessionService";
import { StudentClass } from "./studentClassService";

export interface StudentSessionClassInterface {
    id: number;
    student_id: number;
    class_id: number;
    session_id: number;
    updated_at: string;
    created_at: string;
    session: SchoolSession,
    studentClass: StudentClass,
}
export interface Student {
    id: number;
    name: string;
    admission_number: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    passport_url?: string;
    created_at: string;
    updated_at: string;
    studentSessionClass?: StudentSessionClassInterface[],
}

export default httpService('/students');
