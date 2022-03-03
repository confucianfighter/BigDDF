import { TimeUnits } from "./TimeUtils";
export declare class Timer {
    private startTime;
    private running;
    private taskName;
    private units;
    private time_elapsed;
    constructor();
    start(task_name?: string, units?: TimeUnits): void;
    stop(task_name?: string, units?: TimeUnits): number;
}
export declare let timer: Timer;
