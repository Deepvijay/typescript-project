import { Schema, Document, model } from 'mongoose'

export default interface ILogs {
    logMessage: string,
    createAt:number,
    logType:string
}

export const schema = new Schema({
    logMessage: {
        type: Schema.Types.String
    },
    logType:{
        type:Schema.Types.String
    },
    createAt:{
        type:Schema.Types.Number,
        default: new Date().getTime()
    }

})