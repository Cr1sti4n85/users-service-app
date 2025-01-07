import { Router } from "express";
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from "@controllers/userControllers";
import { getPermissions, verifyToken } from "@middleware/auth";
import { checkRoles } from "@middleware/roles";

const router = Router();

//USER ROUTES
router.use(verifyToken, getPermissions);
router.route("/").get(findUsers).post(checkRoles, createUser);

router.route("/:id").get(findUsersById).put(updateUser).delete(deleteUser);

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
