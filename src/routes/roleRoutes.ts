import { RolesRepository } from "@repositories/roleRepository";
import { RolesService } from "@services/RolesServices";
import { Request, Response, Router } from "express";
import { IRoleRepository, IRoleService, Roles } from "types/RolesTypes";

const router = Router();

const roleRepository: IRoleRepository = new RolesRepository();
const roleService: IRoleService = new RolesService(roleRepository);

//Role ROUTES
router.get("/", async (_req, res: Response) => {
  const users = await roleService.findRoles();
  console.log(users);
  if (!users.length) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.get("/:id", async (req, res: Response) => {
  const users = await roleService.findRoleById(req.params.id);
  if (!users) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.post("/", async (req: Request, res: Response) => {
  const newRole: Roles = req.body;
  const result = await roleService.createRole(newRole);
  res.status(201).json(result);
});

router.put("/:id", async (req: Request, res: Response) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  if (!role) {
    res.status(404).json({ message: "No user found" });
    return;
  }
  res.status(200).json(role);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const role = await roleService.deleteRole(req.params.id);

  res.status(200).json(role);
});

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
