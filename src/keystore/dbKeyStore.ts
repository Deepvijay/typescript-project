import IKeyStore, { keyStoreSchema } from './keyStore';
import { DBConnectionConstant } from "../constant/dbConnectionConstant"
import IUser from '../users/users';

export class DBKeyStore {
    public static KeystoreModel:any
    constructor(){
        let conn:any =DBConnectionConstant.getMasterDBConnection()
        DBKeyStore.KeystoreModel= conn.model('keystores',keyStoreSchema)
    }
    public static async createKeyStore(client:IUser,primaryKey:string,secondaryKey:string):Promise<IKeyStore>{
        const now = new Date().getTime();
        const keystore = this.KeystoreModel.create({
            client:client,
            primaryKey:primaryKey,
            secondaryKey:secondaryKey,
            createdAt:now,
            updatedAt:now
        }as IKeyStore)
        return keystore;
    }
    public static async findforKey(client:IUser,key:string):Promise<IKeyStore|null>{
        const keystore = this.KeystoreModel.findOne({client:client,primaryKey:key,status:true});
        return keystore;
    }
}