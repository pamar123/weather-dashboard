"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var weatherRoutes_js_1 = require("./weatherRoutes.js");
// Fix: weatherRoutes is already a Router, so we can use it directly
router.use('/weather', weatherRoutes_js_1.default);
exports.default = router;
