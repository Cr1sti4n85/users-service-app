"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.createRole = exports.findRoleById = exports.findRoles = void 0;
const roleRepository_1 = require("@repositories/roleRepository");
const RolesServices_1 = require("@services/RolesServices");
const roleRepository = new roleRepository_1.RolesRepository();
const roleService = new RolesServices_1.RolesService(roleRepository);
const findRoles = async (_req, res) => {
    try {
        const roles = await roleService.findRoles();
        if (!roles.length) {
            res.status(404).json({ message: "No roles found" });
            return;
        }
        res.status(200).json(roles);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.findRoles = findRoles;
const findRoleById = async (req, res) => {
    try {
        const role = await roleService.findRoleById(req.params.id);
        if (!role) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(200).json(role);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.findRoleById = findRoleById;
const createRole = async (req, res) => {
    try {
        const newRole = req.body;
        const result = await roleService.createRole(newRole);
        res.status(201).json(result);
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Role already exists" });
            return;
        }
        console.log(error);
        res.status(400).json({ message: "Bad request" });
    }
};
exports.createRole = createRole;
const updateRole = async (req, res) => {
    try {
        const role = await roleService.updateRole(req.params.id, req.body);
        if (!role) {
            res.status(404).json({ message: "No role found" });
            return;
        }
        res.status(200).json(role);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateRole = updateRole;
const deleteRole = async (req, res) => {
    try {
        const role = await roleService.deleteRole(req.params.id);
        if (!role) {
            res.status(404).json({ message: "No role found" });
            return;
        }
        res.status(200).json(role);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteRole = deleteRole;
