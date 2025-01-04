import httpService from "./httpService";
import { SchoolSession } from "./sessionService";
import { StudentClass } from "./studentClassService";
import { Subject } from "./subjectService";

export interface StudentSubjects {
    id: number;
    student_id: number;
    class_id: number;
    session_id: number;
    subject_id: number;
    updated_at: string;
    created_at: string;
    subject?: Subject;
    session?: SchoolSession;
    studentClass?: StudentClass;
}

export default httpService('/student-subjects');

const singleStudentSubjects = httpService('/student-subjects/student');
export { singleStudentSubjects };
