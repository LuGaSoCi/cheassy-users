import { Request, Response } from "express";
import { updatePassword } from "../../application/use-cases/updatePassword";

export class UpdatePasswordController {
  constructor(private updatePasswordUseCase: updatePassword) {}

  async run(req: Request, res: Response) {
    const { id, password, newPassword } = req.body;
    try {
      const user = await this.updatePasswordUseCase.run(
        id,
        password,
        newPassword
      );
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
