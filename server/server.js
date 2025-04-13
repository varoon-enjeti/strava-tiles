"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var PORT = 3000;
var CLIENT_ID = "131710";
var REDIRECT_URI = "http://localhost:3000";
app.get("/auth/strava", function (req, res) {
    var stravaOAuth2URL = "http://www.strava.com/oauth/authorize?client_id= ".concat(CLIENT_ID, "&response_type=code&redirect_uri=").concat(REDIRECT_URI, "&approval_prompt=force&scope=activity:read_all");
    res.redirect(stravaOAuth2URL);
});
app.listen(PORT, function () {
    console.log("Server running at http://localhost:".concat(PORT));
});
