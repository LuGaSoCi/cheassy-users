import { Request, Response } from "express";
import { updateParams } from "../../application/use-cases/updateParams";

export class UpdateParamsController {
  constructor(private updateParamsUseCase: updateParams) {}

  async run(req: Request, res: Response) {
    const { id, temperature, humidity, nh3, co2, ph } = req.body;
    // console.log(req.body);
    try {
      const user = await this.updateParamsUseCase.run(id, temperature, humidity, nh3, co2, +ph);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
