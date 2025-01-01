import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { Response, Router } from "express";
import { IUserRepository, IUserService, User } from "types/UserTypes";

const router = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

router.get("/health", (_req, res: Response) => {
  res.status(200).json({
    ok: true,
    message: "Api is ok",
  });
});

router.get("/users", async (_req, res: Response) => {
  const users = await userService.findUsers();
  if (!users.length) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.post("/users", async (req, res: Response) => {
  const newUser: User = req.body;
  const result = await userService.createUser(newUser);
  res.status(201).json(result);
});

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
