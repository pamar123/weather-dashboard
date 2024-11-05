"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var path_1 = require("path");
var url_1 = require("url");
var index_js_1 = require("./routes/index.js");
dotenv_1.default.config();
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
// Routes
app.use(index_js_1.default);
// Start the server
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
