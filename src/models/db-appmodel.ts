import IAppSettingModel, { schema } from './setting/appsetting'

export class AppSetting {
    public AppModel:any;
    constructor(conn:any) {
        this.AppModel = conn.model('appsetting',schema)
    }
    public async create(setting: any): Promise<IAppSettingModel> {
        return this.AppModel.create({appName:"Vijay",loggerType:'db',loggerConnection:'mongodb://127.0.0.1:27017/typescriptlogs',sessionType:'db',sessionConnection:'mongodb://127.0.0.1:27017/typescript',isLogger:true})
    }
    
    public async getappseting(appName:string):Promise<IAppSettingModel>{
        return this.AppModel.findOne({appName:appName})
    }
}