//for validation perpose it use
import * as Joi from 'joi'

export default {
    userCredential: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    }),
    signup: Joi.object().keys({
        name: Joi.string().min(3).max(5).required().label('Name'),
        email: Joi.string().lowercase().trim().required().email({ minDomainSegments: 2}).label('Email'),//{ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }
        password: Joi.string().required().min(6),
    }),
    profile: Joi.object().keys({
        name: Joi.string().optional().min(1).max(200),
        profilePicUrl: Joi.string().optional().uri(),
    }),
}