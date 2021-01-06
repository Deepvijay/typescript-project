import { ForbiddenError } from './../core/apiError';
import { LoggerService } from './../Logger/loggerService';
import  schema  from './schema';
import express from 'express'
import validator, { ValidationSource } from './../helper/validator';

import asyncHandler from '../helper/asyncHandler';
import { PublicRequest } from '../types/app-request';
import  {DBApiKey}  from '../apikeys/dbApiKeys';
const router = express()

// @ts-ignore
export default router.use(validator(schema.apiKey,ValidationSource.HEADER),asyncHandler(async(req:PublicRequest,res,next)=>{
    //@ts-ignore
    req.apiKey = req.headers['x-api-key'].toString()
    const apiKey = await DBApiKey.findByKey(req.apiKey);
    LoggerService.Instance.info(JSON.stringify(apiKey));
    if(!apiKey) throw new ForbiddenError();
    next();
}))