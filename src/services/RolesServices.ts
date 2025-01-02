import { IRoleRepository, IRoleService, Roles } from "types/RolesTypes";

export class RolesService implements IRoleService {
  private rolesRepository: IRoleRepository;

  constructor(rolesRepository: IRoleRepository) {
    this.rolesRepository = rolesRepository;
  }

  async createRole(Roles: Roles): Promise<Roles> {
    return this.rolesRepository.create(Roles);
  }

  async findRoles(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  async findRoleById(id: string): Promise<Roles | null> {
    return this.rolesRepository.findById(id);
  }

  async updateRole(id: string, Roles: Partial<Roles>): Promise<Roles | null> {
    return this.rolesRepository.update(id, Roles);
  }

  async deleteRole(id: string): Promise<boolean> {
    return this.rolesRepository.delete(id);
  }
}
