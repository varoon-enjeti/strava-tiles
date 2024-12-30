"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
var luxon_1 = require("luxon");
var Activity = /** @class */ (function () {
    function Activity(_a) {
        var id = _a.id, activity_name = _a.activity_name, activity_type = _a.activity_type, date = _a.date, distance = _a.distance, elapsed_time = _a.elapsed_time;
        this.id = id;
        this.activity_name = activity_name;
        this.activity_type = activity_type;
        this.date = new Date(date);
        this.distance = Math.round((distance / 1609.34) * 100) / 100;
        this.elapsed_time = luxon_1.Duration.fromObject({ seconds: elapsed_time }).toFormat("hh:mm:ss");
    }
    return Activity;
}());
exports.Activity = Activity;
