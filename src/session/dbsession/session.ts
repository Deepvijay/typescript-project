import {Schema} from 'mongoose'

export default interface ISessionModel {
    sessionId:string
    createdAt:Number
    endAt:Number
}

export const schema = new Schema({
    sessionId:{
        type:Schema.Types.String
    },
    createdAt:{
        type:Schema.Types.Number,
        default:new Date().getTime()
    },
    endAt:{
        type:Schema.Types.Number,
        default: new Date().getTime()
    }
})