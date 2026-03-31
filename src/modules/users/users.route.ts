import { Router } from "express";
import type { Route } from "@core/interfaces/index";
import UsersController from "./users.controller";
import validationMisdleware from "@core/middleware/validation.middleware";
import RegisterDto from "./dtos/register.dto";

export default class UsersRoute implements Route {
  public path = "/api/users";
  public router = Router();
  public UsersController = new UsersController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(
      this.path,
      validationMisdleware(RegisterDto, true),
      this.UsersController.register,
    ); //post: http://localhost:5000/api/users
  }
}
