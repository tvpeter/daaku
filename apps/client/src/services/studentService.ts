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
    
    created_at: string;
    updated_at: string;
}

export default httpService('/students');
