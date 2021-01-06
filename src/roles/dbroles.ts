import IRole, { RoleCode, roleSchema } from './roles';
import { DBConnectionConstant } from './../constant/dbConnectionConstant';


export class DBRoles {
    private static dbRoleModel:any
    constructor(){
        let conn = DBConnectionConstant.getMasterDBConnection();
        DBRoles.dbRoleModel= conn.model('roles',roleSchema)
    }
    public static async createRole(role:IRole):Promise<{roles:IRole}>{
        role.createdAt=role.updatedAt=new Date().getTime();
        const createdRole = await this.dbRoleModel.create(role)
        return {roles:createdRole};
    }
    public static async findRole(role:IRole):Promise<IRole|null>{
        const createdRole = await this.dbRoleModel.findOne({code:role.code,status:true})
        return createdRole
    }
    public static async findByRole(code:string):Promise<IRole|null>{
        const createdRole = await this.dbRoleModel.findOne({code:code,status:true})
        return createdRole;
    }
}