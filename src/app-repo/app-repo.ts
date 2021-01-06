
export class AppRepo {

    private static _instance: AppRepo;

    public ApplicationSetting = new Map<string, any>();
    public PrimaryDbSetting: string = "";

    constructor() {

    }
    //async method implement here
    public static Instance(): AppRepo {
        if (!AppRepo._instance) {
            AppRepo._instance = new AppRepo();
        }

        return AppRepo._instance;
    }


}