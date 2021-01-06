
import Joi from "joi";

export default {
    roles: Joi.object().keys({
        code: Joi.string().required()
    })
}