import { Request, Response, NextFunction } from "express";

export interface IJsonWebTokenRepository {
  signToken(payload: any): Promise<String>;
  verifyToken(token: string): Promise<any>;
}
