import { Router } from "express";
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from "@controllers/userControllers";
import { registerUser } from "auth/authControllers";

const router = Router();

//Auth Routes
router.post("/auth/register", registerUser);

//USER ROUTES
router.get("/", findUsers);

router.get("/:id", findUsersById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
