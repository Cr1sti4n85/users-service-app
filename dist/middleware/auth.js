"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissions = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("@repositories/userRepository");
const userService_1 = require("@services/userService");
const PermissionTypes_1 = require("../types/PermissionTypes");
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.replace(/^Bearer\s+/, "");
    const secretKey = process.env.SECRET_KEY;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secretKey);
        const getUser = await userService.findUserById(verified.id);
        if (!getUser) {
            res.status(404).send("User not found");
            return;
        }
        req.currentUser = getUser;
        if (!verified) {
            throw new Error("Unauthorized");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
};
exports.verifyToken = verifyToken;
const getPermissions = (req, res, next) => {
    //obtener roles, metodo http y path
    const { currentUser, method, baseUrl } = req;
    const currentModule = baseUrl.substring(5);
    const { roles } = currentUser;
    //conseguir el metodo a partir de los permisos
    const findMethod = PermissionTypes_1.permissions.find((p) => p.method === PermissionTypes_1.Method[method]);
    //armar el permiso correspondiente al scope
    if (!findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)) {
        findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
    }
    //obtener todos los permisos de los roles del user
    // const rolesPermissions = roles?.map((role) => role.permissions);
    const flatPermissions = [
        ...new Set(roles?.flatMap((role) => role.permissions)),
    ];
    //verificar si el user tiene permisos adicionales a los de los roles
    let userPermissions = [];
    if (currentUser.permissions?.length !== 0) {
        userPermissions = currentUser.permissions;
    }
    else {
        userPermissions = flatPermissions;
    }
    //buscar los permisos que tiene el usuario en los permisos del scope
    const permissionsGranted = findMethod?.permissions.find((permission) => userPermissions.includes(permission));
    if (!permissionsGranted) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
};
exports.getPermissions = getPermissions;
