"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const process_1 = require("process");
const server_1 = __importDefault(require("@server/server"));
require("@config/mongodb");
(0, process_1.loadEnvFile)();
const port = process.env.PORT || 8080;
server_1.default.listen(port, () => {
    console.log(`App running on port ${port}`);
});
