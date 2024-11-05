"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var WeatherService = /** @class */ (function () {
    function WeatherService() {
        this.apiKey = process.env.WEATHER_API_KEY || '';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    WeatherService.prototype.getCoordinates = function (cityName) {
        return __awaiter(this, void 0, void 0, function () {
            var geoUrl, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=".concat(cityName, "&limit=1&appid=").concat(this.apiKey);
                        return [4 /*yield*/, fetch(geoUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!data.length) {
                            throw new Error('City not found');
                        }
                        return [2 /*return*/, {
                                lat: data[0].lat,
                                lon: data[0].lon
                            }];
                }
            });
        });
    };
    WeatherService.prototype.getWeatherData = function (cityName) {
        return __awaiter(this, void 0, void 0, function () {
            var coords, weatherUrl, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCoordinates(cityName)];
                    case 1:
                        coords = _a.sent();
                        weatherUrl = "".concat(this.baseUrl, "/forecast?lat=").concat(coords.lat, "&lon=").concat(coords.lon, "&appid=").concat(this.apiKey, "&units=imperial");
                        return [4 /*yield*/, fetch(weatherUrl)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        // Process current weather and next 5 days
                        return [2 /*return*/, this.processWeatherData(data, cityName)];
                }
            });
        });
    };
    WeatherService.prototype.processWeatherData = function (data, cityName) {
        var processedData = [];
        var today = new Date();
        // Current weather (first entry)
        processedData.push({
            city: cityName,
            date: today.toLocaleDateString(),
            icon: data.list[0].weather[0].icon,
            iconDescription: data.list[0].weather[0].description,
            tempF: Math.round(data.list[0].main.temp),
            windSpeed: Math.round(data.list[0].wind.speed),
            humidity: data.list[0].main.humidity
        });
        // Next 5 days
        for (var i = 1; i <= 5; i++) {
            var forecastData = data.list[i * 8 - 1]; // Get data for each day
            var forecastDate = new Date(today);
            forecastDate.setDate(today.getDate() + i);
            processedData.push({
                city: cityName,
                date: forecastDate.toLocaleDateString(),
                icon: forecastData.weather[0].icon,
                iconDescription: forecastData.weather[0].description,
                tempF: Math.round(forecastData.main.temp),
                windSpeed: Math.round(forecastData.wind.speed),
                humidity: forecastData.main.humidity
            });
        }
        return processedData;
    };
    return WeatherService;
}());
exports.default = new WeatherService();
