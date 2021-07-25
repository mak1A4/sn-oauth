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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var chalk = require("chalk");
var inquirer = require("inquirer");
var oauth_1 = require("./oauth");
function default_1(instance, clientId, refreshToken) {
    return __awaiter(this, void 0, void 0, function () {
        var questionList, answers, oauthInstance, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(chalk.green("ServiceNow OAuth 2.0 Authentication").bold());
                    console.log(chalk.blueBright("To get a Client ID & Client Secret you have to create\n  an OAuth Application Registry record in ServiceNow. You just have to provide a name, \n  you can leave everything else blank."));
                    console.log(chalk.yellow("======================================="));
                    questionList = [];
                    if (!instance) {
                        questionList.push({
                            name: "instanceName", type: "input", message: "Instance Name:"
                        });
                    }
                    if (!clientId) {
                        questionList.push({
                            name: "clientId", type: "input", message: "Client ID:"
                        });
                    }
                    questionList.push({
                        name: "user", type: "input", message: "User:"
                    });
                    questionList.push({
                        name: "userPassword", type: "password", message: "Password:", mask: "*"
                    });
                    questionList.push({
                        name: "clientSecret", type: "password", message: "Client Secret:", mask: "*"
                    });
                    return [4 /*yield*/, inquirer.prompt(questionList)];
                case 1:
                    answers = _a.sent();
                    if (!instance)
                        instance = answers.instanceName;
                    if (!clientId)
                        clientId = answers.clientId;
                    oauthInstance = oauth_1.default(instance);
                    if (!!refreshToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, oauthInstance.getRefreshToken(answers.user, answers.userPassword, clientId, answers.clientSecret)];
                case 2:
                    refreshToken = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, oauthInstance.getAccessToken(clientId, answers.clientSecret, refreshToken)];
                case 4:
                    accessToken = _a.sent();
                    return [2 /*return*/, { "accessToken": accessToken, "refreshToken": refreshToken }];
            }
        });
    });
}
exports.default = default_1;
;
