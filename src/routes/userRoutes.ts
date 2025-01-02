import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { Request, Response, Router } from "express";
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
  console.log(users);
  if (!users.length) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.get("/users/:id", async (req, res: Response) => {
  const users = await userService.findUserById(req.params.id);
  if (!users) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.post("/users", async (req: Request, res: Response) => {
  const newUser: User = req.body;
  const result = await userService.createUser(newUser);
  res.status(201).json(result);
});

router.put("/users/:id", async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    res.status(404).json({ message: "No user found" });
    return;
  }
  res.status(200).json(user);
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  const user = await userService.deleteUser(req.params.id);

  res.status(200).json(user);
});

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
