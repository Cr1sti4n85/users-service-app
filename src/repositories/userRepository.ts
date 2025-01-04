import { UserModel } from "@models/Users";
import { IUserRepository, User } from "../types/UserTypes";
import { Query } from "types/RepositoryTypes";

//aca esta la logica para hacer queries a la base de datos
export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }

  async find(query?: Query): Promise<User[]> {
    return await UserModel.find(query || {}).exec(); //con exec retorna solo los datos
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).exec();
  }

  async findOne(query: Query): Promise<User | null> {
    return await UserModel.findOne(query).exec();
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await UserModel.findByIdAndDelete(id).exec();

    return deleted !== null;
  }
}
