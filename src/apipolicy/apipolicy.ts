import { IApiList } from './../apis/apiList';
import { Schema } from 'mongoose';
import IRole from '../roles/roles';

export interface IApiPolicy {
    roles: IRole;
    apiList: IApiList[];
    status: boolean;
    createdAt?: number;
    updatedAt?: number;
}

export const apiPolicySchema = new Schema({
    roles: {
        type: Schema.Types.ObjectId,
        ref: 'IRole',
        required: true
    },
    apiList: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'IApiList'
            }
        ],
        required: true,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
    createdAt: {
        type: Schema.Types.Number,
        select: false,
        required: true
    },
    updatedAt: {
        type: Schema.Types.Number,
        select: false,
        required: true
    }
}, { versionKey: false })