import { ILogger } from './../iLogger';


export class ConsoleLogger implements ILogger{
    init(msg: string): void {
        console.info(msg)
    }
    unsubscribeLogger(): void {
    }
    log(msg: string): void {
        console.log(msg)
    }
    error(msg: string): void {
        console.error(msg)
    }
    info(msg: string): void {
        console.log(msg)
    }
    
}