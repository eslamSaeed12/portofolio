import {Queue} from "bullmq"

export interface IJob {
    getJobName(): string;

    getJob(): Queue;
}