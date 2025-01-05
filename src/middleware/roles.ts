import { RolesRepository } from "@repositories/roleRepository";
import { RolesService } from "@services/RolesServices";
import { NextFunction, Request, Response } from "express";
import { IRoleRepository, IRoleService } from "types/RolesTypes";

const roleRepository: IRoleRepository = new RolesRepository();
const roleService: IRoleService = new RolesService(roleRepository);

export const checkRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  //If no role is provided, create user role by default
  const roles: string[] = req.body && req.body.roles ? req.body.roles : [];
  const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"];

  //if there is a role on request, check if it exists in db
  try {
    const findRoles = await roleService.findRoles({ name: { $in: role } });

    if (findRoles.length === 0) return res.status(404).send("Role not found");

    //el modelo Users pide los ids de los roles, por eso hay que mapear los ids
    req.body.roles = findRoles.map((role) => role._id);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
