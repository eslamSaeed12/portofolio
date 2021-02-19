import { injectable } from "tsyringe";
import { join } from "path";

@injectable()
export default class dirs {
  public readonly eventsDir = join(__dirname, "..", "events");

  public readonly configsDir = __dirname;

  public readonly helpersDir = join(__dirname, "..", "helpers");

  public readonly jobsDir = join(__dirname, "..", "jobs");

  public readonly servicesDir = join(__dirname, "..", "services");

  public readonly tasksDir = join(__dirname, "..", "tasks");

  public readonly viewsDir = join(__dirname, "..", "resources", "views");

  public readonly controllersDir = join(__dirname, "..", "app", "controllers");

  public readonly middlewaresDir = join(__dirname, "..", "app", "middlewares");

  public readonly assetsDir = join(__dirname, "..", "resources", "assets");

  public readonly storageDir = join(__dirname, "..", "app", "storage");

  public readonly interceptorssDir = join(
    __dirname,
    "..",
    "app",
    "interceptors"
  );

  public readonly socketsDir = join(__dirname, "..", "app", "sockets");

  public getViewsFile(file: string) {
    return join(this.viewsDir, file);
  }

  public asset(f: string) {
    return join(this.assetsDir, f);
  }

  public storageFile(sfile: string) {
    return join(this.assetsDir, sfile);
  }

  public getEventFile(filename: string) {
    return join(this.eventsDir, filename);
  }

  public getConfigFile(filename: string) {
    return join(this.configsDir, filename);
  }

  public getHelperFile(filename: string) {
    return join(this.helpersDir, filename);
  }

  public getJobFile(filename: string) {
    return join(this.jobsDir, filename);
  }

  public getServiceFile(filename: string) {
    return join(this.servicesDir, filename);
  }

  public getTaskFile(filename: string) {
    return join(this.tasksDir, filename);
  }
}
