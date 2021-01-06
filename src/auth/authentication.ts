import { LoggerService } from './../Logger/loggerService';
import { AccessTokenError } from './../core/apiError';
import { DBKeyStore } from './../keystore/dbKeyStore';
import { DBUser } from './../users/dbusers';
import { getAccessToken, validationTokenData } from './authUtils';
import validator, { ValidationSource } from './../helper/validator';
import express from 'express';
const router = express();
import schema from './schema';
import asyncHandler from '../helper/asyncHandler';
import { ProtectedRequest } from '../types/app-request';
import { JWT } from '../core/JWT';
import { Types, model } from 'mongoose';
import { AuthFailureError, TokenExpiredError } from '../core/apiError';
//@ts-ignore
export default router.use(validator(schema.auth, ValidationSource.HEADER), asyncHandler(async (req: ProtectedRequest, res, next) => {


    req.accessToken = getAccessToken(req.headers.authorization)
    try {
        const payload = await JWT.validate(req.accessToken);
        console.log("==================")
        console.log("authentication")
        // console.log(req.roles)
        // console.log(req.user)
        // console.log(payload.role)
        // console.log("authentication")
        // console.log("==================")

        const user = await DBUser.findById(new Types.ObjectId(payload.sub));
        console.log(user)
        if(user==null) throw new AuthFailureError('Uest not REgister');
        if (!user) throw new AuthFailureError('User not Register');
        req.user = user;
        const keystore = await DBKeyStore.findforKey(req.user._id, payload.prm);
        if (!keystore) throw new AuthFailureError('Invalid Access Token');
        req.keystore = keystore;
        // console.log(req);
        return next();

    } catch (err) {
        if (err instanceof TokenExpiredError) throw new AccessTokenError();
        throw new AuthFailureError("User not Register")
        LoggerService.Instance.error(err)
    }

})
);
// export default router.use(validator(schema.auth, ValidationSource.HEADER), asyncHandler(async (req, res, next) => {
// console.log("from Authentications")
// console.log(req.headers.authorization)
// }))