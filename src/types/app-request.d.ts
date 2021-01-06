import { Request } from 'express'
import IKeyStore from '../keystore/keyStore';
import IUser from '../users/users';

declare interface PublicRequest extends Request {
    apiKey: string
}

declare interface RoleRequest extends PublicRequest {
    currentRoleCode: string;
}
declare interface ProtectedRequest extends Request {
    user: IUser,
    roles:string,
    accessToken: string,
    keystore:IKeyStore   
}

declare interface Tokens {
    accessToken: string,
    refreshToken: string
}