import {computeTimeElapsed, TimeUnits} from "./TimeUtils";

export async function delay(millis:number){
    let marked_time = new Date();
    while(computeTimeElapsed(marked_time, new Date(),TimeUnits.millis) < millis){}
}



