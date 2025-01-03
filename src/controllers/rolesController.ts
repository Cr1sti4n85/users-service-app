import { Request, Response } from "express";
import { RolesRepository } from "@repositories/roleRepository";
import { RolesService } from "@services/RolesServices";
import { IRoleRepository, IRoleService, Roles } from "types/RolesTypes";

const roleRepository: IRoleRepository = new RolesRepository();
const roleService: IRoleService = new RolesService(roleRepository);

export const findRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.findRoles();
    if (!roles.length) {
      res.status(404).json({ message: "No roles found" });
      return;
    }
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const findRoleById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.findRoleById(req.params.id);
    if (!role) {
      res.status(404).json({ message: "No user found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const newRole: Roles = req.body;
    const result = await roleService.createRole(newRole);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Role already exists" });
      return;
    }
    console.log(error);
    res.status(400).json({ message: "Bad request" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    if (!role) {
      res.status(404).json({ message: "No role found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.deleteRole(req.params.id);
    if (!role) {
      res.status(404).json({ message: "No role found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
