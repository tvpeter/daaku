import httpService from "./httpService";
 
export enum SessionStatus {
    OPEN = 'open',
    CLOSED = 'closed',
  }

export interface SchoolSession {
    id?: number;
    name: string;
    status: SessionStatus,
    created_at: string;
    updated_at: string;
}

export default httpService('/session');

