import httpService from "./httpService";

export interface StudentClass {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export default httpService('/studentclass');
