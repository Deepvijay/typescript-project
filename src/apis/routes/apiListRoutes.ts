import { DBApiList } from './../dbapilist';
import { IApiList } from '../apiList';
import express from 'express';
import apikeys from '../../auth/apikeys';
import validator from '../../helper/validator';
import asyncHandler from '../../helper/asyncHandler';
import schema from './apiSchema';
import { SuccessReponse } from '../../core/apiResponse';
import _ from 'lodash';
import { BadRequestError } from '../../core/apiError';
const router = express();
router.use('/', apikeys)
router.put('/addapi', validator(schema.apiList), asyncHandler(async (req, res) => {
    console.log(req.body)
    const apiDetails = req.body as IApiList
    const isExitApi = await DBApiList.findApi(apiDetails);
    console.log(isExitApi)
    if(isExitApi) throw new BadRequestError(`${apiDetails.apiName} api  with ${apiDetails.version} version allready registerd` )
    const { api: createdApi } = await DBApiList.addApi(apiDetails)
    new SuccessReponse('Api Added SuccessFully', {
        api: _.pick(createdApi, ['_id', 'apiName', 'version'])
    }).send(res)
}))

export default router;