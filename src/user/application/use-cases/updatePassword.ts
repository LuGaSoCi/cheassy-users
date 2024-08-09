import { IUserRepository } from "../../domain/iuser.repository";
import { IBcryptRepository } from "../services/ibycript.repository";

export class updatePassword {
  constructor(
    private userRepository: IUserRepository,
    private bycript: IBcryptRepository
  ) {}

  async run(id: string, password: string, newPassword: string): Promise<any> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await this.bycript.comparePasswords(
      password,
      user.password
    );

    if (user.password && !isMatch) {
      throw new Error("Invalid password");
    }

    const hashedPassword = await this.bycript.hashPassword(newPassword);

    return this.userRepository.updatePassword(id, hashedPassword);
  }
}
