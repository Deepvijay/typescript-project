import { Schema } from 'mongoose';
import IUser from '../users/users';

export default interface IKeyStore {
    client:IUser,
    primaryKey:string,
    secondaryKey:string,
    status?:boolean,
    createdAt?:number,
    updatedAt?:number
}

export const keyStoreSchema = new Schema({
    client:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'IUser'
    },
    primaryKey:{
        type:Schema.Types.String,
        required:true
    },
    secondaryKey:{
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
})

keyStoreSchema.index({client:1,primaryKey:1})
keyStoreSchema.index({client:1,primaryKey:1,secondaryKey:1})