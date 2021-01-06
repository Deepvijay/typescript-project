// import { LoggerService } from './../Logger/loggerService';
import { LoggerService } from '../Logger/loggerService';
import { SessionService } from '../session/sessionService';
import { DBConstants } from './../constant/dbConstant';
export class SessionManager {

    public static async initSession(config: Map<string, any>): Promise<boolean> {
        // console.log(config)
        var sessionType = config.get(DBConstants.APP_SETTING_SESSION_TYPE);
        var isConfigValid = false;
        switch (sessionType) {
            case 'db':
                SessionService.setSession(sessionType, config.get(DBConstants.APP_SETTING_SESSION_TYPE_DB_CONN))
                isConfigValid= true
                break;
            case 'redis':
                sessionType.setSession(sessionType);
                isConfigValid= true

                break;
            default:
                SessionService.setSession('db', DBConstants.APP_SETTING_SESSION_TYPE_DB_CONN)
                isConfigValid= true
                break;

        }
        if (!isConfigValid)
            return false

        LoggerService.Instance.info(`init session Type ${sessionType} `)

        return true
    }
}