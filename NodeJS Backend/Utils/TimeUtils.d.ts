export declare enum TimeUnits {
    months = "months",
    weeks = "weeks",
    days = "days",
    hours = "hours",
    minutes = "minutes",
    seconds = "seconds",
    millis = "milliseconds"
}
export declare function computeTimeElapsed(start: Date, end: Date, units: TimeUnits): number;
