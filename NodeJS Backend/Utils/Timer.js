"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = exports.Timer = void 0;
var TimeUtils_1 = require("./TimeUtils");
var Timer = /** @class */ (function () {
    function Timer() {
        this.startTime = new Date();
        this.running = false;
        this.taskName = "";
        this.units = TimeUtils_1.TimeUnits.seconds;
        this.time_elapsed = null;
        this.running = false;
    }
    Timer.prototype.start = function (task_name, units) {
        if (this.running) {
            throw new Error("Start was called on a timer that is already running!");
        }
        this.taskName = task_name !== null && task_name !== void 0 ? task_name : "";
        this.units = units !== null && units !== void 0 ? units : this.units;
        this.startTime = new Date();
        this.running = true;
    };
    Timer.prototype.stop = function (task_name, units) {
        if (!this.running) {
            throw new Error("Stop was called on a timer that wasn't running yet.");
        }
        this.taskName = task_name !== null && task_name !== void 0 ? task_name : this.taskName;
        this.units = units !== null && units !== void 0 ? units : this.units;
        this.running = false;
        var now = new Date();
        this.time_elapsed = (0, TimeUtils_1.computeTimeElapsed)(this.startTime, now, this.units);
        //leave the tab there                vv
        if (this.taskName != "")
            console.log("   ".concat(this.taskName, " took ").concat(this.time_elapsed, " ").concat(this.units));
        return this.time_elapsed;
    };
    return Timer;
}());
exports.Timer = Timer;
exports.timer = new Timer();
//# sourceMappingURL=Timer.js.map