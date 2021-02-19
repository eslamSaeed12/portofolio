import {Queue, QueueEvents, Worker, Processor, WorkerOptions} from "bullmq"
import {IJob} from "../interfaces/IJob";

export abstract class Job implements IJob {

    abstract readonly JobName: string;

    abstract handleEvents(): void;

    abstract HandleWorker(job: any): Promise<Processor<any, any, string>> | any;

    public process(workerOptions_: WorkerOptions) {
        new Worker(this.JobName, this.HandleWorker, workerOptions_);
        this.handleEvents();
    }

    public getJob() {
        return this.queue_;
    }

    public getJobName() {
        return this.JobName;
    }

    constructor(protected queue_: Queue, protected events: QueueEvents) {

    }

}