import { ILogger } from './../iLogger';
import redisClient from '../../helper/initRedis/initRedis'
export class RedisLogger implements ILogger {
    init(msg: string): void {
        // redisClient.set("init",msg)
    }
    unsubscribeLogger(): void {

        throw new Error('Method not implemented.');
    }
    log(msg: string): void {
        redisClient.set("log", msg)
    }
    error(msg: string): void {
        redisClient.set("error", msg)
        // throw new Error('Method not implemented.');
    }
    info(msg: string): void {
        redisClient.set("info", msg)
        // throw new Error('Method not implemented.');
    }


}