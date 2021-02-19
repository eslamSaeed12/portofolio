import dotenv from "dotenv";
import { join } from "path";
import { singleton } from "tsyringe";

@singleton()
export default class env {
  constructor() {
    dotenv.config();
  }

  get(key: string) {
    return process.env[key];
  }

  exist(key: string) {
    return !!process.env[key];
  }
}
