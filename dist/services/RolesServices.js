"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
class RolesService {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async createRole(Roles) {
        return this.rolesRepository.create(Roles);
    }
    async findRoles(query) {
        return this.rolesRepository.find(query);
    }
    async findRoleById(id) {
        return this.rolesRepository.findById(id);
    }
    async updateRole(id, Roles) {
        return this.rolesRepository.update(id, Roles);
    }
    async deleteRole(id) {
        return this.rolesRepository.delete(id);
    }
}
exports.RolesService = RolesService;
