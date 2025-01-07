"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("@routes/userRoutes"));
const roleRoutes_1 = __importDefault(require("@routes/roleRoutes"));
const postRoutes_1 = __importDefault(require("@routes/postRoutes"));
const authRoutes_1 = __importDefault(require("@routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/users", userRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/roles", roleRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
exports.default = app;
