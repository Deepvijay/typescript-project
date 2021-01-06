import mongoose from 'mongoose';
import { LoggerService } from '../Logger/loggerService';
export class DBConnection {
    public connectionUrl: string = "";
    constructor() { }
    public static async makeConnection(url: string): Promise<Object | boolean> {
        const db = mongoose.createConnection(url, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        db.on('error', (err) => {
            console.log("error here")
            // LoggerService.Instance.error(`MongoDB :: connection ${db.name} ${JSON.stringify(err)}`)
            db.close().catch(() => { console.log(`MongoDB :: failed to close connection ${db.name}`); });
        });

        db.on('connected', () => {
            mongoose.set('debug', (col: string, method: string, query: string, doc: any) => {
                // console.log(`MongoDB :: ${db.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
            });
            console.log(`MongoDB :: connected ${db.name}`);
            // LoggerService.Instance.info(`MongoDB :: connected ${this.name}`)
        })
        db.on('disconnected', () => {
            console.log(`MongoDB ::  Disconnected ${this.name}`)
            // LoggerService.Instance.info(`MongoDB ::  Disconnected ${this.name}`)
            // return false;
        })
        //  console.log(db)
        //  console.log("==============================")
        //  console.log(mongoose.connection.readyState)
        //  console.log("==============================")

        return db
    }
    public static async getConnStates() {
        return mongoose.connections.map((conn) => {
                console.log("getConnStates")
            return conn.readyState;
        });
    }

   public static async getConnection(dbString:object){
        return dbString;
   } 
}