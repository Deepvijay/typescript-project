import { SocketLogger } from './socketLogger/socketLogger';
import { RedisLogger } from './redisLogger/redisLogger';
import { ConsoleLogger } from './consoleLogger/consoleLogger';
import { DBLogger } from './dbLogger/dbLogger';
import { FileLogger } from './fileLogger/fileLogger';
import { ILogger } from './iLogger';

export class LoggerService { 
    static Instance: ILogger
    constructor() {
        LoggerService.Instance = new ConsoleLogger();
    }
    public static setLogger(type: string,conn?:any): void { 

        switch (type) { 
            case 'db':
                this.Instance = new DBLogger(conn);
                break;
            case 'file':
                this.Instance = new FileLogger();
                break;
            case 'redis':
                this.Instance = new RedisLogger();
                break;
            case 'socket':
                this.Instance = new SocketLogger();
                break;
            case 'console':
                this.Instance = new ConsoleLogger();
                break;
        }

    }


}