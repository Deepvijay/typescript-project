import { createTokens } from './../../auth/authUtils';
import { DBKeyStore } from './../../keystore/dbKeyStore';
import { DBUser } from './../dbusers';
import schema from './userSchema';
import express from 'express';
import asyncHandler from '../../helper/asyncHandler';
import { AuthFailureError, BadRequestError } from '../../core/apiError';
import bcrypt from 'bcrypt';
import { SuccessReponse } from '../../core/apiResponse';
import _ from 'lodash';
import crypto from 'crypto'
import validator from '../../helper/validator';
import apikeys from '../../auth/apikeys';
const router = express();
router.use('/', apikeys);
router.post('/login', validator(schema.userCredential), asyncHandler(async (req, res, next) => {
    const user = await DBUser.findByEmail(req.body.email)
    
    if (!user) throw new BadRequestError('User not register')
    if (!user.password) throw new BadRequestError('Password not set');
    const match = await bcrypt.compare(req.body.password, user.password);
    

    if (!match) throw new AuthFailureError('Authentication Failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    await DBKeyStore.createKeyStore(user._id, accessTokenKey, refreshTokenKey);
    const token = await createTokens(user, accessTokenKey, refreshTokenKey)
    new SuccessReponse('Login Success', {
        user: _.pick(user, ['_id', 'name', 'email']),
        token: token
    }).send(res)
}))

export default router