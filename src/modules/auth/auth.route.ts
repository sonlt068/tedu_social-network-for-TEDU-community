import AuthController from "./auth.controller";
import { Router } from "express";
import type { Route } from "@core/interfaces";

export default class AuthRoute implements Route {
  public path = "/api/auth";
  public router = Router();
  public authController = new AuthController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(this.path, this.authController.login); //post: http://localhost:5000/api/auth
  }
}
