import { IUserRepository } from "../../domain/iuser.repository";

export class updateParams {
  constructor(private userRepository: IUserRepository) {}

  async run(
    id: string,
    temperature: number,
    humidity: number,
    nh3: number,
    co2: number,
    ph: number
  ): Promise<any> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const params = {
      temperature,
      humidity,
      nh3,
      co2,
      ph,
    }

    return this.userRepository.updateParams(
      id,
      params
    );
  }
}
