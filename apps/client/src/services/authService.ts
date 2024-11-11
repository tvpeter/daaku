import httpService from "./httpService";

export interface AuthUserState {
    username: string;
    role: string;
  }

  export default httpService('/auth')
