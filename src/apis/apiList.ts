import { Document,Schema } from "mongoose"

// export interface IPList extends Document{

// }

export interface IApiList extends Document{
    apiName:string;
    status:boolean;
    version:number;
    createdAt?:number;
    updatedAt?:number;
}

export const apiListSchema= new Schema({
    apiName:{
        type:Schema.Types.String,
        required:true,
        trim:true,
    },
    status:{
        type:Schema.Types.Boolean,
        default:true
    },
    version:{
        type:Schema.Types.Number,
        required:true
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