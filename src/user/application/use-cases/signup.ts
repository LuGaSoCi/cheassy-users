import { IUserRepository } from "../../domain/iuser.repository";
import { IBcryptRepository } from "../services/ibycript.repository";
import { User } from "../../domain/user";

export class signUp {
  constructor(
    private userRepository: IUserRepository,
    private bycriptRepository: IBcryptRepository
  ) {}

  async run(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const userFound = await this.userRepository.findByEmail(email);

    if (userFound) {
      throw new Error("Ese correo ya está en uso");
    }

    const hashedPassword = await this.bycriptRepository.hashPassword(password);
    const photo = "https://res.cloudinary.com/dn1ng7anm/image/upload/v1720400784/ranchero_c7ttku.png";

    // Define los valores predefinidos para params
    const predefinedParams = {
      temperature: 35,
      humidity: 70,
      nh3: 20,
      co2: 10,
      ph: 5.5,
    };

    const user = new User(
      "",
      firstName,
      lastName,
      email,
      hashedPassword,
      photo,
      [],
      predefinedParams // Añade los params predefinidos aquí
    );
    return await this.userRepository.signup(user);
  }
}
