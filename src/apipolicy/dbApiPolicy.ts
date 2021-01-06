import { apiPolicySchema, IApiPolicy } from './apipolicy';
import { DBConnectionConstant } from './../constant/dbConnectionConstant';
import { Types } from 'mongoose';
export class DBApiPolicy {
    private static dbApiPolicyModel: any;
    constructor() {
        const conn = DBConnectionConstant.getMasterDBConnection();
        DBApiPolicy.dbApiPolicyModel = conn.model('apipolicy', apiPolicySchema)
    }
    public static async createApiPolicy(policy: IApiPolicy): Promise<{ apiPolicy: IApiPolicy }> {
        policy.createdAt = policy.updatedAt = new Date().getTime();
        const policyDetail = await this.dbApiPolicyModel.findOneAndUpdate({'roles._id':policy.roles._id},{$addToSet:{"apiList":policy.apiList},$set:{ roles:policy.roles,createdAt:new Date().getTime(),updatedAt:new Date().getTime(),status:true}},{new:true,upsert: true});//,{$push:{apiList:Types.ObjectId(policy.apiList[0]._id)}},{new:true}
        console.log("testPolicyDetail")
        console.log(policyDetail)
        return { apiPolicy: policyDetail }
    }
    public static async findPolicyByRole(roles: Types.ObjectId): Promise<IApiPolicy | null> {
        const policyDetail = await this.dbApiPolicyModel.findOne({ roles: roles, status: true });
        return policyDetail;
    }
}