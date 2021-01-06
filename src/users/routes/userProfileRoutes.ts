import schema from './userSchema';
import { DBUser } from './../dbusers';
import express from 'express';
import authentication from '../../auth/authentication';
import asyncHandler from '../../helper/asyncHandler';
import { ProtectedRequest } from '../../types/app-request';
import { BadRequestError } from '../../core/apiError';
import { SuccessReponse } from '../../core/apiResponse';

import _ from 'lodash';
import { Types } from 'mongoose';
import validator from '../../helper/validator';
import apikey from '../../auth/apikeys'
import authorization from '../../auth/authorization';

const router = express();
router.use('/', apikey);

router.use('/', authentication, authorization)
//@ts-ignore
router.get('/myprofile', asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await DBUser.findById(new Types.ObjectId(req.user._id));
    if (!user) throw new BadRequestError('User not Register');
    return new SuccessReponse('success', _.pick(user, ['name', 'email', 'profilePicUrl'])).send(
        res,
    );
}))
//below are use for update profile
//@ts-ignore
router.put('/updateprofile', validator(schema.profile), asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await DBUser.findById(new Types.ObjectId(req.user._id));
    if (!user) throw new BadRequestError('User Not Register');
    if (req.body.name) user.name = req.body.name;
    if (req.body.profilePicUrl) user.profilePicUrl = req.body.profilePicUrl
    await DBUser.updateInfo(user);
    new SuccessReponse('Profile Update', _.pick(user, ['name', 'profilePicUrl'])).send(res)
}))
export default router;