import { RoleModel } from "@models/Roles";
import { Roles, IRoleRepository } from "types/RolesTypes";

export class RolesRepository implements IRoleRepository {
  async create(data: Roles): Promise<Roles> {
    const newRoles = new RoleModel(data);
    return await newRoles.save();
  }

  async find(): Promise<Roles[]> {
    return await RoleModel.find().exec();
  }

  async findById(id: string): Promise<Roles | null> {
    return await RoleModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Roles>): Promise<Roles | null> {
    return await RoleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await RoleModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
