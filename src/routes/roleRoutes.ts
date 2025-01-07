import { Router } from "express";
import {
  createRole,
  deleteRole,
  findRoleById,
  findRoles,
  updateRole,
} from "@controllers/rolesController";
import { getPermissions, verifyToken } from "@middleware/auth";

const router = Router();

//Role ROUTES
router.use(verifyToken, getPermissions);
router.route("/").get(findRoles).post(createRole);

router.route("/:id").get(findRoleById).put(updateRole).delete(deleteRole);

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
