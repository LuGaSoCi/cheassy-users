  import { Request, Response } from "express";
  import { signIn } from "../../application/use-cases/signin";
  import { JsonWebTokenUtility } from "../utilities/jwt.utility";
import { Prisma } from "@prisma/client";

  const jwt = new JsonWebTokenUtility();

  export class SignInController {
    constructor(private signInUseCase: signIn) {}

    async run(req: Request, res: Response) {
      const { email, password } = req.body;
      try {
        const user = await this.signInUseCase.run(email, password);
        const token = await jwt.signToken({ id: user.id });

        const response = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          cheeses: user.cheeses || [],
          photo: user.photo,
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
