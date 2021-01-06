import { DBRoles } from './../roles/dbroles';
import { DBApiPolicy } from './../apipolicy/dbApiPolicy';
import { AuthFailureError, BadRequestError } from './../core/apiError';
import express from 'express';
import asyncHandler from '../helper/asyncHandler';
import { ProtectedRequest } from '../types/app-request';
import { JWT } from '../core/JWT';
import { DBApiList } from '../apis/dbapilist';
import { Types } from 'mongoose';
import { type } from 'os';
const router = express();
//@ts-ignore
export default router.use(asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.roles) throw new AuthFailureError('Permission denied')
    console.log("from Authorization")
    const payload = await JWT.validate(req.accessToken);
    const roleDetails = await DBRoles.findByRole(payload.role)
    if (!roleDetails) throw new AuthFailureError('Permission dened');
    const isRolePolicy = await DBApiPolicy.findPolicyByRole(new Types.ObjectId(roleDetails?._id))
    if(!isRolePolicy) throw new AuthFailureError('Permission denied');
    const apiDetails = await DBApiList.findByApiName(req.url);
    if (!apiDetails) throw new BadRequestError()

    //here i want to check permission for api
    const validPermission =isRolePolicy?.apiList.filter(
        (apiPermission)=>apiPermission._id.toHexString() === apiDetails._id.toHexString()
    )
    console.log("validPermission")
    console.log(validPermission)
    if(!validPermission||validPermission.length==0)throw new AuthFailureError('Permission denied')
    return next();
}))