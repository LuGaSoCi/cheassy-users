import { Request, Response } from "express";
import { update } from "../../application/use-cases/update";

export class UpdateController {
  constructor(private updateUseCase: update) {}

  async run(req: Request, res: Response) {
    const { id, firstName, lastName, email } = req.body;
    try {
      const user = await this.updateUseCase.run(id, firstName, lastName, email);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
