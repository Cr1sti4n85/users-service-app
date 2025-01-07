"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUsersById = exports.findUsers = void 0;
const userRepository_1 = require("@repositories/userRepository");
const userService_1 = require("@services/userService");
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const findUsers = async (_req, res) => {
    try {
        const users = await userService.findUsers();
        if (!users.length) {
            res.status(404).json({ message: "No users found" });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.findUsers = findUsers;
const findUsersById = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.findUsersById = findUsersById;
const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const result = await userService.createUser(newUser);
        res.status(201).json(result);
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Username or email already exists" });
            return;
        }
        console.log(error);
        res.status(400).json({ message: "Bad request" });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
