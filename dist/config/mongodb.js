"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = require("process");
(0, process_1.loadEnvFile)();
const mongoUri = process.env.MONGO_URI;
//IIFE to connect to MongoDB
exports.default = (async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
})();
