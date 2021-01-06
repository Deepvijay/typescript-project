import { DBRoles } from './../roles/dbroles';
import { DBKeyStore } from './../keystore/dbKeyStore';
import { Types } from 'mongoose';
import IKeyStore from '../keystore/keyStore';
import { DBConnectionConstant } from './../constant/dbConnectionConstant';
import IUser, { userSchema } from './users';
import { InternalError } from '../core/apiError';

export class DBUser {
    public static userModel: any;
    constructor() {
        // let dbConnectionConstant = new DBConnectio??nConstant();
        let conn: any = DBConnectionConstant.getMasterDBConnection();
        DBUser.userModel = conn.model('users', userSchema)
    }
    public static async createUser(user: IUser, roleCode: string = 'USER'): Promise<{ user: IUser }> {
        user.createdAt = user.updatedAt = new Date().getTime()
        const role = await DBRoles.findByRole(roleCode);
        if(!role) throw new InternalError('Role must be Defined');
        user.roles=[role._id];
        const createdUser = await this.userModel.create(user)
        return { user: createdUser }
    }
    public static findByEmail(email: string): Promise<IUser | null> {
        const user = this.userModel.findOne({ email: email, status: true }).select('+email +password')
        return user;

    }
    public static findById(id: Types.ObjectId): Promise<IUser | null> {
        const user = this.userModel.findOne({ _id: id, status: true })
        return user;
    }
    public static async update(user: IUser, accessToken: string, refreshToken: string): Promise<{ user: IUser; keystore: IKeyStore }> {
        user.updatedAt = new Date().getTime();
        await this.userModel.updateOne({ _id: user._id }, { $set: { ...user } }).lean().exec();
        const keystore = await DBKeyStore.createKeyStore(user._id, accessToken, refreshToken);
        return { user: user, keystore: keystore };
    }
    public static async updateInfo(user: IUser): Promise<{ user: IUser }> {
        user.updatedAt = new Date().getTime();
        const userInfo = await this.userModel.updateOne({ _id: user._id }, { $set: { ...user } }).lean().exec();
        return { user: userInfo }
    }
} 