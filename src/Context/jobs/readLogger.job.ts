import { inject, injectable, registry } from "tsyringe";
import { Job } from "../../vendor/abstractions/job-class";
import { Queue, QueueEvents } from "bullmq";

@injectable()
@registry([
  {
    token: "read-logger-job",
    useValue: new Queue("read-logger-queue"),
  },
  {
    token: "read-logger-event-handler",
    useValue: new QueueEvents("read-logger-queue"),
  },
])
export default class readlogger extends Job {
  JobName = "read-logger";

  constructor(
    @inject("read-logger-job") queue_: Queue,
    @inject("read-logger-event-handler") eventsHandler: QueueEvents
  ) {
    super(queue_, eventsHandler);
  }

  handleEvents(): void {
    this.events.on("completed", (job) => {
      console.log("completed finally ");
    });
  }

  HandleWorker(job: any) {
    if (job.finished) {
      return true;
    }
  }
}
