import { singleton } from "tsyringe";
import databases from "../../Config/databases.conf";
import { createClient, RedisClient as RedisProvider } from "redis";

@singleton()
export default class RedisConnection {
  constructor(protected dbConfig: databases) {}

  public getConnection(): RedisProvider {
    return createClient(this.dbConfig.getCacheOptions());
  }
}
