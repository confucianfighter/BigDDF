"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeTimeElapsed = exports.TimeUnits = void 0;
var TimeUnits;
(function (TimeUnits) {
    TimeUnits["months"] = "months";
    TimeUnits["weeks"] = "weeks";
    TimeUnits["days"] = "days";
    TimeUnits["hours"] = "hours";
    TimeUnits["minutes"] = "minutes";
    TimeUnits["seconds"] = "seconds";
    TimeUnits["millis"] = "milliseconds";
})(TimeUnits = exports.TimeUnits || (exports.TimeUnits = {}));
/* Returns time elapsed in units of choice. Returns undefined if this function is broken.
    usage example: computeMinutesElapsed(
                        new Date(some time stamp),
                        new Date(),
                        TimeUnits.minutes
                   );
 */
function computeTimeElapsed(start, end, units) {
    // undefined would indicate a problem:
    // also this function needs to return negative time difference so we can compare and sort by time!
    var result = undefined;
    var diff_millis = end.getTime() - start.getTime();
    // look for a missing 'break' if there is a problem:
    switch (units) {
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
    if (result === undefined)
        throw new Error("\n            My God man! Utils.TimeUtils.computeTimeElapsed is broken! \n            This could result in really bad things! \n            I mean, you could make some really bad trades!\n            Worse you could be late for a hot date!\n            ");
    return result;
}
exports.computeTimeElapsed = computeTimeElapsed;
//# sourceMappingURL=TimeUtils.js.map