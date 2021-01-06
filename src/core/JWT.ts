import { LoggerService } from './../Logger/loggerService';
import { InternalError, TokenExpiredError, BadTokenError } from './apiError';
import path from 'path';
import { readFile } from "fs";
import { promisify } from "util";
import { sign, verify } from 'jsonwebtoken';
export class JWT {
    private static readPublicKey(): Promise<string> {
        return promisify(readFile)(path.join(__dirname, '../../keys/public.pem'), 'utf8')
    }
    private static readPrivateKey(): Promise<string> {
        return promisify(readFile)(path.join(__dirname, '../../keys/private.pem'), 'utf8')
    }
    public static async encode(payload: JwtPayload): Promise<string> {
        const cert = await this.readPrivateKey();
        if (!cert) throw new InternalError('Token Geration Fail');
        console.log("encode payload")
        console.log(payload)
        console.log("encode payload")

        //@ts-ignore
        return promisify(sign)({ ...payload }, cert, { algorithm: 'RS256' });
    }
    /**
   * This method checks the token and returns the decoded data when token is valid in all respect
   */
    public static async validate(token: string): Promise<JwtPayload> {
        const cert = await this.readPublicKey();
        try {
            // @ts-ignore
            return (await promisify(verify)(token, cert)) as JwtPayload;
        } catch (e) {
            console.log("line 33c from JWT")
            LoggerService.Instance.error(e.toString())
            if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError();
            // throws error if the token has not been encrypted by the private key
            console.log("line 37 JWT")
            throw new BadTokenError();
        }
    }


}

export class JwtPayload {
    aud: string;
    sub: string;
    iss: string;
    iat: number;
    exp: number;
    prm: string;
    role: string;
    constructor(issuer: string, audience: string, subject: string, param: string, validity: number,role:string ) {

        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 24 * 60 * 60;
        this.prm = param;
        this.role=role;
    }
}