import { ILogger } from './../iLogger';

export class FileLogger implements ILogger{
    init(msg: string): void {
        throw new Error('Method not implemented.');
    }
    unsubscribeLogger(): void {
        throw new Error('Method not implemented.');
    }
    log(msg: string): void {
        throw new Error('Method not implemented.');
    }
    error(msg: string): void {
        throw new Error('Method not implemented.');
    }
    info(msg: string): void {
        throw new Error('Method not implemented.');
    }
    
    
}