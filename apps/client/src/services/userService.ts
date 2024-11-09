import httpService from "./httpService";

export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: 'active' | 'disabled',
    role: string;
    created_at: string,
    updated_at: Date,
}

export default httpService('/users');
