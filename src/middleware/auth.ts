import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository, IUserService, User } from "types/UserTypes";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/, "");
  const secretKey = process.env.SECRET_KEY as string;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const verified = jwt.verify(token, secretKey) as User;
    const getUser = await userService.findUserById(verified.id);

    if (!getUser) {
      res.status(404).send("User not found");
      return;
    }

    req.currentUser = getUser;

    if (!verified) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};
