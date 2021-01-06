import { DBUser } from '../dbusers';
import express from 'express'
import asyncHandler from '../../helper/asyncHandler'
import IUser from '../users';
import schema from './userSchema';
import validator from '../../helper/validator';
import { BadRequestError } from '../../core/apiError';
import bcrypt from 'bcrypt';
import { SuccessReponse } from '../../core/apiResponse';
import _ from 'lodash';
import apikey from '../../auth/apikeys'
import { RoleRequest } from '../../types/app-request';
import { RoleCode } from '../../roles/roles';

const router = express()
router.use('/', apikey);
//@ts-ignore
router.post('/singup', validator(schema.signup), asyncHandler(async (req: RoleRequest, res, next) => {
    console.log(req.body)

    const user = await DBUser.findByEmail(req.body.email)
    if (user) throw new BadRequestError('User already Register')
    const roles = req.body.roles ? req.body.roles : RoleCode.USER;
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const { user: createdUser } = await DBUser.createUser({
        name: req.body.name,
        email: req.body.email,
        profilePicUrl: req.body.profilePicUrl,
        password: passwordHash,
        airportName: req.body.airportName
    } as IUser, roles)

    new SuccessReponse('Singup Successfull', {
        user: _.pick(createdUser, ['_id', 'name', 'email', 'profilePicUrl'])
    }).send(res)
}))

// router.post('/singup',validator(schema.signup), asyncHandler(async(req,res,next)=>{


export default router