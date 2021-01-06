import { ILogger } from './../iLogger';
import ILogs, { schema } from './logs'


export class DBLogger implements ILogger {

    public static logsModel: any
    constructor(conn: any) {
        console.log(" connection of DBLogger")
        DBLogger.logsModel = conn.model('logs', schema)
    }

    createLog(obj: any): void {
        return DBLogger.logsModel.create(obj)
    }

    init(msg: string): void {
        return this.createLog({ logMessage: msg, logType: 'init' })

    }

    unsubscribeLogger(): void {
        throw new Error('Method not implemented.');
    }
    log(msg: string): void {
        return this.createLog({ logMessage: msg, logType: 'logs' })

    }
    error(msg: string) {
        return this.createLog({ logMessage: msg, logType: 'error' })

    }
     info(msg: string):void {
        console.log("INFO")
        return  this.createLog({ logMessage: msg, logType: 'info' })
    }


}