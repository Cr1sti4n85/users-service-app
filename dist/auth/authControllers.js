"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("@repositories/userRepository");
const userService_1 = require("@services/userService");
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const registerUser = async (req, res) => {
    const { email } = req.body;
    try {
        const userExists = await userService.findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: "User email already exists" });
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isValidPass = await user.comparePassword(password);
        if (!isValidPass)
            return res.status(400).json({ message: "Invalid email or password" });
        const secretKey = process.env.SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: "1h" });
        res.status(201).json({
            user,
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
