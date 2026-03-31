import type { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import UserService from "./users.service";

export default class UsersController {
  private userService = new UserService();
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: RegisterDto = req.body;
      const token = await this.userService.createUser(model);
      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  };
}
