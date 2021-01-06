import Joi from "joi";

export default {
    apiList: Joi.object().keys({
        apiName: Joi.string().required().max(20).min(3).label('Api Name'),
        version: Joi.number().required().label('Api Version'),
    })
}