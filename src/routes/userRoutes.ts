import { Router } from "express";
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from "@controllers/userControllers";
import { loginUser, registerUser } from "auth/authControllers";
import { verifyToken } from "middleware/auth";

const router = Router();

//Auth Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

//USER ROUTES
router.use(verifyToken);
router.route("/").get(findUsers).post(createUser);

router.route("/:id").get(findUsersById).put(updateUser).delete(deleteUser);

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
