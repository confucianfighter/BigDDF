export enum TimeUnits
{
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    millis
}

/* Returns time elapsed in units of choice. Returns undefined if this function is broken.
    usage example: computeMinutesElapsed(
                        new Date(some time stamp),
                        new Date(),
                        TimeUnits.minutes
                   );
 */
export function computeTimeElapsed(start:Date, end:Date, units:TimeUnits): number | undefined
{
    // undefined would indicate a problem:
    let result:number | undefined = undefined;
    let diff_millis = end.getTime() - start.getTime();
    // look for a missing 'break' if there is a problem:
    switch(units)
    {
        case TimeUnits.months:
            result = diff_millis / (1000 * 60 * 60 * 24 * 28);
            break;
        case TimeUnits.weeks:
            result = diff_millis / (1000 * 60 * 60 * 24 * 7);
            break;
        case TimeUnits.days:
            result = diff_millis / (1000 * 60 * 60 * 24);
            break;
        case TimeUnits.hours:
            result = diff_millis / (1000 * 60 * 60);
            break;
        case TimeUnits.minutes:
            result = diff_millis / (1000 * 60);
            break;
        case TimeUnits.seconds:
            result = diff_millis / (1000);
            break;
        case TimeUnits.millis:
            result = diff_millis;
            break;
    }
    if(result === undefined)
        throw new Error(`
            My God man! Utils.TimeUtils.computeTimeElapsed is broken! 
            This could result in really bad things! 
            I mean, you could make some really bad trades!
            Worse you could be late for a hot date!
            `);
    return result;
}