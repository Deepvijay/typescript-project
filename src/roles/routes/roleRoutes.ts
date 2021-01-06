
import express from 'express';
import _ from 'lodash';
import apikeys from '../../auth/apikeys';
import { BadRequestError } from '../../core/apiError';
import { SuccessReponse } from '../../core/apiResponse';
import asyncHandler from '../../helper/asyncHandler';
import { DBRoles } from '../dbroles';
import IRole from '../roles';
const router = express();

router.use('/', apikeys);
router.put('/addrole', asyncHandler(async (req, res) => {
    const roleDetails = req.body as IRole;
    
    const isExits = await DBRoles.findRole(roleDetails)
    if(isExits) throw new BadRequestError(`${roleDetails.code} allready exits`)
    await DBRoles.createRole(roleDetails)
    new SuccessReponse('Role create Successfully',{
        roles:_.pick(roleDetails,['code'])
    }).send(res)
}))
export default router