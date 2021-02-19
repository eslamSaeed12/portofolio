export interface ITask {
    run(): void;

    cancel(): void;
}