import { singleton } from "tsyringe";
import { createConnection, Connection } from "typeorm";

@singleton()
export default class typeormConnection {
  public getConnection(): Promise<Connection> {
    return createConnection();
  }
}
