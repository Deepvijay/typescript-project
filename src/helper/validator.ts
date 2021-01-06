import * as Joi from 'joi'
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../Logger/loggerService';
import { BadRequestError } from '../core/apiError';

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}



export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = schema.validate(req[source])
        if (!error) return next();
        const { details } = error;
        console.log(details)
        details.forEach(err=>{
            console.log(err.type);
            switch(err.type){
                case 'string.empty':
                        err.message="Value Should not Epty";break;
                case 'string.base':
                        err.message ="Name must be string";break;
                case 'string.min':
                        err.message ="Name length must be at least 3 characters long";break;
                case 'string.mx':
                        err.message="Name length must be less than or equal to 5 characters long";break;
                case 'string.email':
                        err.message="Must be valid Email";break;

                
            }
        })
        const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');// + " Request  info " + JSON.stringify(req) ;
 
        LoggerService.Instance.error(message)
        next(new BadRequestError(message));
    } catch (err) {
        console.log(err)
        next(err);
    }
}

// export const JoiAuthBearer=()=>{
//     Joi.string().custom((value:string,helpers)=>{
//         if(!value.startsWith('Bearer ')) return helpers.error('any.invalid');
//         if(!value.split(' ')[1])return helpers.error('any.invalid');
//         return value;
//     },'Authorization header Validation');
// }
export const JoiAuthBearer = () =>
    Joi.string().custom((value: string, helpers) => {
        if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
        if (!value.split(' ')[1]) return helpers.error('any.invalid');
        return value;
    }, 'Authorization Header Validation');

