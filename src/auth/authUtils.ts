import { AuthFailureError, InternalError } from './../core/apiError';
import { tokenInfo } from '../config';
import { JWT, JwtPayload } from './../core/JWT';
import { Tokens } from "../types/app-request";
import IUser from "../users/users";
import { Types } from 'mongoose';
import authentication from './authentication';
/**
 * 
 * @param user 
 * @param accessTokenKey 
 * @param refreshTokenKey 
 * @param role
 */
export const createTokens = async (user: IUser, accessTokenKey: string, refreshTokenKey: string): Promise<Tokens> => {
    const accessToken = await JWT.encode(
        new JwtPayload(tokenInfo.issuer,tokenInfo.audience,user._id.toString(),accessTokenKey, tokenInfo.accessTokenValidityDays,'USER'),
        
    )

    if (!accessToken) throw new InternalError()
    const refreshToken = await JWT.encode(
        new JwtPayload(
            tokenInfo.issuer,
            tokenInfo.audience,
            user._id.toString(),
            accessTokenKey,
            tokenInfo.accessTokenValidityDays,'USER'),
    )
    return { accessToken: accessToken, refreshToken: refreshToken } as Tokens
}

export const validationTokenData = async (payload: JwtPayload): Promise<boolean> => {
    if (!payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        !payload.role||
        payload.iss != tokenInfo.issuer ||
        payload.aud != tokenInfo.audience ||
        !Types.ObjectId.isValid(payload.sub)
    )
        throw new AuthFailureError('Invalid Access Token')
    return true
}

export const getAccessToken =(authorization?:string)=>{
    console.log("getAccessToken")
    console.log(authorization)
    if(!authorization) throw new AuthFailureError('Invalid Authorization');
    if(!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid Authorization');
    return authorization.split(' ')[1];
}