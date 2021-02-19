import {injectable} from "tsyringe";
import {getConnectionOptions, ConnectionOptions} from "typeorm"
import {ClientOpts} from "redis"

type DB_CLIENTS = "TYPEORM" | "MONGOOSE";

@injectable()
export default class databases {
    
    private cacheDB = "REDIS";
    private DB = "mysql";
    private client: DB_CLIENTS = "TYPEORM";
    private clientOptions: Promise<ConnectionOptions> = getConnectionOptions();
    private cacheOptions: ClientOpts = {}


    public getCacheOptions() {
        return this.cacheOptions;
    }

    public getCacheType() {
        return this.cacheDB;
    }

    public getDBType() {
        return this.DB;
    }

    public getClientType() {
        return this.client;
    }


    public getClientOptions() {
        return this.clientOptions;
    }
}