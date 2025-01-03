import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/UserTypes";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email }: User = req.body;
  try {
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User email already exists" });
    }
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
