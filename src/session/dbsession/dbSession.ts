import  ISessionModel, {schema} from './session';
import { ISession } from './../Isession';

export class DBSession implements ISession{

    public sessionModel:any;
    constructor(conn:any){
        this.sessionModel = conn.model('session',schema)
    }

    async  createSession(obj:any):Promise<ISessionModel>{
        return this.sessionModel.create(obj)
    }
    async set(sessionId: string): Promise<void> {
        this.createSession({sessionId:sessionId})
        // throw new Error('Method not implemented.');
        return ;
    }
    get(sessionId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    isExits(sessionId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    isValid(sessionId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    
}