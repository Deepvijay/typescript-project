import { Document, Schema, Types } from "mongoose";

export default interface IApiKeys extends Document{
    key:string;
    version:number,
    metaData:string,
    status:boolean,
    createdAt?:number,
    updatedAt:number
}
export const apiKeyschema = new Schema({
    key:{
        type:Schema.Types.String,
        required:true,
        unique:true,
        maxlength:1024,
    },
    version:{
        type:Schema.Types.Number,
        required:true,
        min:1,
        max:100
    },
    metaData:{
        type:Schema.Types.String,
        required:true
    },
    status:{
        type:Schema.Types.Boolean,
        default:true
    },
    createdAt:{
        type:Schema.Types.Number,
        required:true,
        select:false
    },
    updatedAt:{
        type:Schema.Types.Number,
        required:true,
        select:false
    }
},{versionKey:false})