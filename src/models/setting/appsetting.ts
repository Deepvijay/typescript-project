import { Document, Schema, model } from 'mongoose'

// export const DOCUMENT_NAME = "appsetting"

// export const COLLECTION_NAME = "appsettings"


export default interface IAppSettingModel extends Document {
    loggerType: string;
    appName?: string;
    loggerConnection?:string;
    sessionType?:string;
    sessionConnection?:string;
    isLogger?:boolean;
}




export const schema = new Schema(
    {
        loggerType: {
            type: Schema.Types.String,
            trim: true,
        },
        appName: {
            type: Schema.Types.String,
        },
        loggerConnection:{
            type:Schema.Types.String
        },
        sessionConnection:{
            type:Schema.Types.String
        },
        sessionType: {
            type: Schema.Types.String,
            trim: true,
        },
        isLogger:{
            type:Schema.Types.Boolean,
            default:false
        }

    } 
);

// export const AppModel = model<IAppSettingModel>(DOCUMENT_NAME, schema, COLLECTION_NAME);