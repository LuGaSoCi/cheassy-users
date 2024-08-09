import { IUserRepository } from "../../domain/iuser.repository";
import { IJsonWebTokenRepository } from "../services/ijwt.repository";
import { User } from "../../domain/user";

export class VerifyToken {
  constructor(
    private userRepository: IUserRepository,
    private jwtRepository: IJsonWebTokenRepository
  ) {}

  async run(token: string): Promise<User> {
    const decoded = await this.jwtRepository.verifyToken(token);
    console.log(decoded);
    if (!decoded || !decoded.email) {
      throw new Error("Token inválido");
    }

    const user = await this.userRepository.findByEmail(decoded.email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }
}
