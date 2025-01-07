"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const roleRepository_1 = require("@repositories/roleRepository");
const RolesServices_1 = require("@services/RolesServices");
const roleRepository = new roleRepository_1.RolesRepository();
const roleService = new RolesServices_1.RolesService(roleRepository);
const checkRoles = async (req, res, next) => {
    //If no role is provided, create user role by default
    const roles = req.body && req.body.roles ? req.body.roles : [];
    const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"];
    //if there is a role on request, check if it exists in db
    try {
        const findRoles = await roleService.findRoles({ name: { $in: role } });
        if (findRoles.length === 0)
            return res.status(404).send("Role not found");
        //el modelo Users pide los ids de los roles, por eso hay que mapear los ids
        req.body.roles = findRoles.map((role) => role._id);
        next();
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.checkRoles = checkRoles;
