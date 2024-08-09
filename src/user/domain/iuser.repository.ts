import { User } from "./user";

export interface IUserRepository {
  signup(user: User): Promise<User>;
  signin(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
  update(id: string, firstName: string, lastName: string, email: string): Promise<User>;
  updatePassword(id: string, password: string): Promise<User>;
  updateParams(id: string, data: any): Promise<User>;
}
