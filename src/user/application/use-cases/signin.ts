import { IUserRepository } from "../../domain/iuser.repository";
import { IBcryptRepository } from "../services/ibycript.repository";
import { User } from "../../domain/user";

export class signIn {
  constructor(
    private userRepository: IUserRepository,
    private bycript: IBcryptRepository
  ) {}

  async run(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await this.bycript.comparePasswords(
      password,
      user.password
    );

   if(!isMatch){ 
    throw new Error("Contraseña incorrecta");
   }
    
    return user;
  }
}
