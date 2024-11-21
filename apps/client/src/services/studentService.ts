import httpService from "./httpService";

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
    current_class_id?: number;
    current_session_id?: number;
    class: {
        name: string;
    };
    session: {
        name: string;
    };
    created_at: string;
}

export default httpService('/students');
