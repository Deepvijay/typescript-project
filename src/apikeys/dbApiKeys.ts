import  IApiKeys,{apiKeyschema} from './apiKeys';
import { DBConnectionConstant } from "../constant/dbConnectionConstant"

export  class DBApiKey {
    public static apiKeyModel: any
    constructor() {
        let conn = DBConnectionConstant.getMasterDBConnection();
        DBApiKey.apiKeyModel=conn.model('apikeys',apiKeyschema)
    }
    public static async createApiKey(api:IApiKeys):Promise<{apikeys:IApiKeys}>{
        let apikeys = await this.apiKeyModel.create(api)
        return{apikeys:apikeys}
    }
    public static async findByKey(key:string):Promise<IApiKeys|null>{
        let apikeys = await this.apiKeyModel.findOne({key:key, status:true})
        return apikeys
    }
}