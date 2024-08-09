import { Request, Response } from "express";
import { VerifyToken } from "../../application/use-cases/verifyToken";

export class VerifyTokenController {
  constructor(private verifyTokenUseCase: VerifyToken) {}

  async run (req: Request, res: Response) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No se proporcionó token" });
    }

    console.log(token)

    try {
      const user = await this.verifyTokenUseCase.run(token);
      
      const response = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
        cheeses: user.cheeses || [],
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}