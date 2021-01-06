export interface ISession {
    // init(mes:string):Promise <void>
    set(sessionId:string):Promise<void>
    get(sessionId:string):Promise<void>
    isExits(sessionId:string):Promise<boolean>
    isValid(sessionId:string):Promise<boolean>
}