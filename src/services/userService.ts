import { IUserRepository, IUserService, User } from "types/UserTypes";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: User): Promise<User> {
    return this.userRepository.create(data);
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
