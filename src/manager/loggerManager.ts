import { DBLogger } from './../Logger/dbLogger/dbLogger';
import { LoggerService } from './../Logger/loggerService';
import { DBConstants } from "../constant/dbConstant";

export class LoggerManager {

    public static async initLogger(config: Map<string, any>): Promise<boolean> {
        // console.log("initLogger")
        var loggerType = config.get(DBConstants.APP_SETTING_LOGGER_TYPE);
        var isConfigValid = false
        switch (loggerType) {
            case "console":
                isConfigValid = true;
                break;
            case "db":
                console.log(loggerType)
                LoggerService.setLogger(loggerType,config.get(DBConstants.APP_SETTING_LOGGER_TYPE_DB_CONN))
                isConfigValid = true;
                break;
        }

        if (!isConfigValid)
            return false;
        LoggerService.Instance.init(`init Logger Type ${loggerType} here`)
        return true;
    }
} 