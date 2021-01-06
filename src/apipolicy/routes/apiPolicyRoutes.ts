import { DBApiPolicy } from './../dbApiPolicy';
import { IApiPolicy } from './../apipolicy';
import express from 'express';
import apikeys from '../../auth/apikeys';
import asyncHandler from '../../helper/asyncHandler';
import { SuccessReponse } from '../../core/apiResponse';
const router = express();

router.use('/',apikeys);
router.put('/addpolicy',asyncHandler(async(req,res)=>{
    console.log(req.body)
    const policy= req.body as IApiPolicy
    const {apiPolicy:policyDetail} = await DBApiPolicy.createApiPolicy(policy)
    console.log(policyDetail)
    new SuccessReponse('Add policy for role Successfuly',{}).send(res)
}))
export default router