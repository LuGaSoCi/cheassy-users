import { Request, Response } from "express";
import { signUp } from "../../application/use-cases/signup";
import { JsonWebTokenUtility } from "../utilities/jwt.utility";

const jwt = new JsonWebTokenUtility();

export class SignUpController {
  constructor(private signUpUseCase: signUp) {}

  async run(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await this.signUpUseCase.run(firstName, lastName, email, password);
      const token = await jwt.signToken({ id: user.id });

      const response = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cheeses: user.cheeses || [],
        params: user.params,
        token: token,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}