import { DBApiPolicy } from './apipolicy/dbApiPolicy';
import { DBRoles } from './roles/dbroles';
import { DBApiList } from './apis/dbapilist';
import { DBKeyStore } from './keystore/dbKeyStore';
import { AppSetting } from './models/db-appmodel';
import express,{ Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { DBConnection } from './dbConection/dbConnetion'
import { LoggerService } from './Logger/loggerService';
import { AppRepo } from './app-repo/app-repo';
import { DBConstants } from './constant/dbConstant';
import { LoggerManager } from './manager/loggerManager'
import { SessionManager } from './manager/sessionManager';
import { DBSession } from './session/dbsession/dbSession';
import { SessionService } from './session/sessionService';
import { DBConnectionConstant } from './constant/dbConnectionConstant';
import { DBUser } from './users/dbusers';
import {DBApiKey} from './apikeys/dbApiKeys';
import IUser from './users/users';
import user from './users/routes/userSingupRoutes';
import login from './users/routes/userLoginRoutes';
import profile from './users/routes/userProfileRoutes';
import api from './apis/routes/apiListRoutes';
import role from './roles/routes/roleRoutes';
import policy from './apipolicy/routes/apiPolicyRoutes';
import { ApiError, InternalError } from './core/apiError';


((async (): Promise<void> => {
    try {
        AppRepo.Instance().ApplicationSetting = new Map<string, object>();

        let masterDbConnection = await Promise.resolve(DBConnection.makeConnection("mongodb://127.0.0.1:27017/typescript"))
        AppRepo.Instance().ApplicationSetting.set(DBConstants.APP_MASTER_DB_CONN, masterDbConnection)

        let setting = new AppSetting(masterDbConnection)
        // setting.create({ 'loggerType': 'db', appName: 'test' })
        let appBaseSetting = await setting.getappseting('Vijay')
        if (appBaseSetting.isLogger) {
            let connString = appBaseSetting.loggerConnection ? appBaseSetting.loggerConnection : "";
            let sessionConn = appBaseSetting.sessionConnection ? appBaseSetting.sessionConnection : "";

            AppRepo.Instance().ApplicationSetting.set(DBConstants.APP_SETTING_LOGGER_TYPE, appBaseSetting.loggerType)
            let loggerConnection = await Promise.resolve(DBConnection.makeConnection(connString))
            AppRepo.Instance().ApplicationSetting.set(DBConstants.APP_SETTING_LOGGER_TYPE_DB_CONN, loggerConnection)
            var isInitSuccess = await LoggerManager.initLogger(AppRepo.Instance().ApplicationSetting)
            let sesstionConnection = await Promise.resolve(DBConnection.makeConnection(sessionConn))
            AppRepo.Instance().ApplicationSetting.set(DBConstants.APP_SETTING_SESSION_TYPE_DB_CONN, sesstionConnection)
            AppRepo.Instance().ApplicationSetting.set(DBConstants.APP_SETTING_SESSION_TYPE, appBaseSetting.sessionType)
            var isInitSession = await SessionManager.initSession(AppRepo.Instance().ApplicationSetting);
            SessionService.Instance.set("1234")
            let dbConnectionConstant = new DBConnectionConstant(AppRepo.Instance().ApplicationSetting)
            let dbuser = new DBUser()
            let dbkeystore = new DBKeyStore()
            let dbapikey = new DBApiKey();
            let dbApiList = new DBApiList();
            let dbRoleList= new DBRoles()
            let dbApiPolicy = new DBApiPolicy()
        }

        

    } catch (err) {
        console.log("dbConnection Error")
        console.log(err)
    }
}))()


const app = express();
app.use(bodyParser.json());
app.use('/user',user);
app.use('/userlogin',login);
app.use('/userprofile',profile);
app.use('/api',api);
app.use('/role',role);
app.use('/policy',policy);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("from App.ts")
    console.log(err)
    if(err instanceof ApiError){
        console.log("ApiError")
        LoggerService.Instance.error(err.message)

        ApiError.handle(err, res);
    }else{
        console.log("ERror from App.ts " + err.message);
        LoggerService.Instance.error(err.message)
        ApiError.handle(new InternalError(), res);
    }
    

})
export default app;