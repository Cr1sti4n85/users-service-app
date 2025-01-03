//LOGICA DEL NEGOCIO
import { Query, Repository } from "./RepositoryTypes";

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

//este es el repositoriio que construimos para buscar la data
export interface IUserRepository extends Repository<User> {
  //metodo solo aplica a los users por eso es aparte del Repository
  findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
  createUser(data: User): Promise<User>;
  findUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
