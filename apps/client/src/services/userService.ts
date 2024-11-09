import httpService from "./httpService";

export interface User {
    id: number;
    name: string;
}

export default httpService('/users');
