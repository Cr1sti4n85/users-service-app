//LOGICA DEL NEGOCIO
import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Roles extends Document {
  name: string;
  permissions: string[];
}

//este es el repositoriio que construimos para buscar la data
export interface IRoleRepository extends Repository<Roles> {}

export interface IRoleService {
  createRole(roles: Roles): Promise<Roles>;
  findRoles(query?: Query): Promise<Roles[]>;
  findRoleById(id: string): Promise<Roles | null>;
  updateRole(id: string, role: Partial<Roles>): Promise<Roles | null>;
  deleteRole(id: string): Promise<boolean>;
}
