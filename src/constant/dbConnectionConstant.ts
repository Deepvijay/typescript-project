import { DBConstants } from "./dbConstant";

export class DBConnectionConstant{
    public static  APP_MASTER_DB_CONN:Object ;

    constructor(config:Map<string,any>){
        // console.log(config)
            DBConnectionConstant.APP_MASTER_DB_CONN = config.get(DBConstants.APP_MASTER_DB_CONN);
    }
    public static  getMasterDBConnection():any{
        return DBConnectionConstant.APP_MASTER_DB_CONN
    }
    
}