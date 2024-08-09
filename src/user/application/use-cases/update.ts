import { IUserRepository } from "../../domain/iuser.repository";
import { User } from "@prisma/client";
export class update {
  constructor(private userRepository: IUserRepository) {}

  async run(
    id: string,
    firstName: string,
    lastName: string,
    email: string
  ): Promise<any> {
    return this.userRepository.update(id, firstName, lastName, email);
  }
}
