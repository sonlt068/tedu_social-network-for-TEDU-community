import type { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import LoginDto from "./auth.dto";

export default class AuthController {
  private authService = new AuthService();
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDto = req.body;
      const token = await this.authService.login(model);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };
}
