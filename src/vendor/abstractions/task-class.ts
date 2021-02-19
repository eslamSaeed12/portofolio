import {ITask} from "../interfaces/ITask";
import scheduler from "node-schedule"
import {inject} from "tsyringe";
import croner from "cron-time-generator"

export abstract class Task implements ITask {

    abstract readonly expression: string;

    abstract readonly taskName: string;

    protected abstract schedule(fireDate: Date): void;

    public run() {
        this.cronProvider.scheduleJob(this.taskName, this.expression, this.schedule);
    }

    public cancel() {
        this.cronProvider.cancelJob(this.taskName);
    }

    constructor(@inject(typeof scheduler) private cronProvider: typeof scheduler, @inject(typeof croner) protected cronGenerator: typeof croner
    ) {

    }
}