import {computeTimeElapsed, TimeUnits} from "./TimeUtils";

export class Timer {
    private startTime = new Date();
    private running = false;
    private taskName = "";
    private units = TimeUnits.seconds;
    private time_elapsed: number | null = null;

    constructor(){
        this.running = false;
    }
    public start(task_name?:string, units?:TimeUnits) {
        if (this.running) {
            throw new Error("Start was called on a timer that is already running!")
        }
        this.taskName = task_name ?? "";
        this.units = units ?? this.units;
        this.startTime = new Date();
        this.running = true;
    }

    public stop(task_name?:string, units?:TimeUnits): number {
        if (!this.running) {
            throw new Error("Stop was called on a timer that wasn't running yet.")
        }
        this.taskName = task_name ?? this.taskName;
        this.units = units ?? this.units;
        this.running = false;
        let now = new Date();
        this.time_elapsed = computeTimeElapsed(this.startTime, now, this.units);
        //leave the tab there                vv
        if(this.taskName != "") console.log(`   ${this.taskName} took ${this.time_elapsed} ${this.units}`);
        return this.time_elapsed;
    }
}

export let timer = new Timer();