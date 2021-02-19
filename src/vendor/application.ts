import { Application, Handler } from "express";
import {
  useExpressServer,
  useContainer as routingControllersContainer,
} from "routing-controllers";
import express from "express";
import { useContainer as typormContainer } from "typeorm";
import { container, singleton } from "tsyringe";
import { TsyringeAdapter } from "./tsyringeAdapter";
import env from "../Logic/Helpers/env.helper";
import { appIoc } from "./App-ioc";
import { join } from "path";
import helmet from "helmet";
import PinoHttp from "pino-http";
import typeormConnection from "../Database/Connections/typeorm.con";
import { Guard } from "./abstractions/Guard-class";

@singleton()
export class application {
  constructor(
    private appIoc_: appIoc,
    private dotenv: env,
    private typeormConnection: typeormConnection,
    private guard: Guard
  ) {}

  private app: Application = express();

  private globalMiddlewares: Handler[] = [
    PinoHttp({
      prettifier: true,
      prettyPrint: {
        colorize: true,
      },
    }),
    helmet(),
  ];

  private beforeServe() {
    return this.typeormConnection.getConnection();
  }

  private afterServe() {
    console.log(`App is run at ${this.dotenv.get("PORT")} successfully`);
  }

  private UseContainers() {
    this.appIoc_.setProviders();
    this.appIoc_.registerProviders();
    const adapter = new TsyringeAdapter(container);
    routingControllersContainer(adapter);
    typormContainer(adapter);
  }

  private build() {
    this.UseContainers();
    useExpressServer(this.app, {
      controllers: [
        join(process.cwd(), "src", "Core", "controllers", "*.ctr.ts"),
      ],
      middlewares: [
        join(process.cwd(), "src", "Core", "middlewares", "*.mid.ts"),
      ],
      interceptors: [
        join(process.cwd(), "src", "Core", "interceptors", "*.int.ts"),
      ],
      validation: true,
      classTransformer: true,
    });
  }

  public buildGlobalMiddlewares() {
    this.globalMiddlewares.forEach((m) => this.app.use(m));
  }

  public async bootstrap() {
    this.buildGlobalMiddlewares();
    this.build();
    await this.beforeServe();
    this.setupGuard();
    this.main();
    this.afterServe();
  }

  private main() {
    this.app.listen(this.dotenv.get("PORT"));
  }

  private setupGuard() {
    //this.guard.SetDefault()
  }
}
