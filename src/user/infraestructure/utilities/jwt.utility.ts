import { Request, Response, NextFunction } from "express";
import { IJsonWebTokenRepository } from "../../application/services/ijwt.repository";
import jwt from "jsonwebtoken";

export class JsonWebTokenUtility implements IJsonWebTokenRepository {
  async signToken(payload: any): Promise<string> {
    return jwt.sign(payload, process.env.TOKEN_SECRET || "");
  }

  async verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET || "", (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}