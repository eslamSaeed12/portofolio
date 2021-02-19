import { injectable } from "tsyringe";
import { Task } from "../../vendor/abstractions/task-class";

@injectable()
export default class StatusTask extends Task {
  expression = this.cronGenerator.everyMinute();
  taskName = "status-logger";

  protected schedule(fireDate: Date): void {
    console.log(fireDate.toLocaleDateString());
  }
}
