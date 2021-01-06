import { types } from 'util';
import { DBSession } from './dbsession/dbSession';
import { ISession } from './Isession';
export class SessionService {
    static Instance:ISession;
    constructor(){
        
    }
    public static setSession(type:string,conn?:string):void{
        switch(type){
            case 'db':
                SessionService.Instance = new DBSession(conn)
                    break;
            case 'redis':
                    break;
            default :
                SessionService.Instance = new DBSession(conn)

        }
    }
}