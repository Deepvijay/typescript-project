/**
 * api for Roles 
 */
import { Schema ,Document} from 'mongoose';

export const enum RoleCode {
    USER = "USER",
    ADMIN = "ADMIN",
    MASTERADMIN = "MASTERADMIN",
    SUPERMASTERADMIN = "SUPERMASTERADMIN"
}

export default interface IRole extends Document {
    code: string,
    status?: boolean,
    createdAt?: number,
    updatedAt?: number
}

export const roleSchema = new Schema({
    code: {
        type: Schema.Types.String,
        required: true,
        enum: [RoleCode.USER, RoleCode.ADMIN, RoleCode.MASTERADMIN, RoleCode.SUPERMASTERADMIN]
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
    createdAt: {
        type: Schema.Types.Number,
        required: true,
        select: false
    },
    updatedAt: {
        type: Schema.Types.Number,
        required: true,
        select: false
    },


}, { versionKey: false })