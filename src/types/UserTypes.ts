import { Repository } from "./RepositoryTypes";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

//este es el repositoriio que construimos para buscar la data
export interface IUserRepository extends Repository<User> {}

export interface IUserService {
  createUser(data: User): Promise<User>;
  findUsers(): Promise<User[]>;
}
