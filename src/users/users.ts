import { required } from 'joi';
import { Document, Schema } from 'mongoose'
import IRole from '../roles/roles';

export default interface IUser extends Document {

    name: string;
    email?: string;
    phoneNumber?: number;
    password?: string;
    profilePicUrl?: string,
    picName?: string;
    airportName: string;
    roles: IRole[];
    verified?: boolean;
    status?: boolean;
    createdAt?: number;
    updatedAt?: number;
}

export const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        select: false,
        trim: true
    },
    phoneNumber: {
        type: Schema.Types.Number,
    },
    password: {
        type: Schema.Types.String,
        select: false
    },
    profilePicUrl: {
        type: Schema.Types.String,
        trim: true
    },
    picName: {
        type: Schema.Types.String,
        trim: true
    },
    airportName: {
        type: Schema.Types.String,
        trim: true,
        // required:true
    },
    roles: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "IRole"
        },
        ],
        required:true,
        // select:false
    },
    verified: {
        type: Schema.Types.Boolean,
        default: false
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
    createdAt: {
        type: Schema.Types.Number,
        required: true
    },
    updatedAt: {
        type: Schema.Types.Number,
        required: true
    },

}, {
    versionKey: false,
})

userSchema.index({ name: 1, email: 1 });
userSchema.index({ name: 1, email: 1, phoneNumber: 1 });
userSchema.index({ name: 1, email: 1, phoneNumber: 1, airportName: 1 });
