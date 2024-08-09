import { IBcryptRepository } from "../../application/services/ibycript.repository";
import bcrypt from "bcrypt";

export class BcryptUtility implements IBcryptRepository {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}