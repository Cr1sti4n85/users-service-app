import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService, User } from "types/UserTypes";
import { permissions, Method } from "../types/PermissionTypes";

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

export const getPermissions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //obtener roles, metodo http y path
  const { currentUser, method, baseUrl } = req;

  const currentModule = baseUrl.substring(5);
  const { roles } = currentUser;
  //conseguir el metodo a partir de los permisos
  const findMethod = permissions.find(
    (p) => p.method === Method[method as keyof typeof Method]
  );

  //armar el permiso correspondiente al scope
  if (
    !findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)
  ) {
    findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
  }

  //obtener todos los permisos de los roles del user
  // const rolesPermissions = roles?.map((role) => role.permissions);

  const flatPermissions = [
    ...new Set(roles?.flatMap((role) => role.permissions)),
  ];

  //verificar si el user tiene permisos adicionales a los de los roles
  let userPermissions: string[] = [];

  if (currentUser.permissions?.length !== 0) {
    userPermissions = currentUser.permissions!;
  } else {
    userPermissions = flatPermissions;
  }

  //buscar los permisos que tiene el usuario en los permisos del scope
  const permissionsGranted = findMethod?.permissions.find((permission) =>
    userPermissions.includes(permission)
  );

  if (!permissionsGranted) {
    res.status(401).send("Unauthorized");
    return;
  }

  next();
};
