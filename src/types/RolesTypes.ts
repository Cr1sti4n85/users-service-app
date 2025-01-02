//LOGICA DEL NEGOCIO
import { Repository } from "./RepositoryTypes";

export interface Roles {
  id: string;
  name: string;
}

//este es el repositoriio que construimos para buscar la data
export interface IRoleRepository extends Repository<Roles> {}

export interface IRoleService {
  createRole(roles: Roles): Promise<Roles>;
  findRoles(): Promise<Roles[]>;
  findRoleById(id: string): Promise<Roles | null>;
  updateRole(id: string, role: Partial<Roles>): Promise<Roles | null>;
  deleteRole(id: string): Promise<boolean>;
}
