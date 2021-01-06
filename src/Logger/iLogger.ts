
export interface ILogger {
    init(msg:string): void
    unsubscribeLogger(): void
    log(msg:string): void
    error(msg:string): void
    info(msg:string): void
}