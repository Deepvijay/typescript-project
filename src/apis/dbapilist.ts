import { DBConnectionConstant } from '../constant/dbConnectionConstant';
import { apiListSchema, IApiList } from './apiList';
export class DBApiList {
    public static dbApiListModel: any;
    constructor() {
        let conn = DBConnectionConstant.getMasterDBConnection();
        DBApiList.dbApiListModel = conn.model('apilists', apiListSchema)
    }
    public static async addApi(apiList: IApiList): Promise<{ api: IApiList }> {
        apiList.createdAt = apiList.updatedAt = new Date().getTime()
        let createdApi = await this.dbApiListModel.create(apiList);
        return { api: createdApi }
    }
    public static async findApi(apiList: IApiList): Promise<IApiList> {
        let apiDetails = await this.dbApiListModel.findOne({ apiName: apiList.apiName, version: apiList.version, status: true })
        return apiDetails
    }
    public static async findByApiName(apiName: string): Promise<IApiList | null> {
        const apiDetails = await this.dbApiListModel.findOne({ apiName: apiName, status: true })
        return apiDetails
    }
    public static async editApi(apiList: IApiList): Promise<{ api: IApiList }> {
        console.log("Edit apilist Pending")
        return { api: apiList }
    }
}