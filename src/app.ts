import mongoose from "mongoose";
import type { Route } from "@core/interfaces/index";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import { Logger } from "@core/utils";
import { errorMiddleware } from "@core/middleware";
dotenv.config();
class App {
  public app: express.Application;
  public port: number | string;
  public production: boolean = process.env.NODE_ENV === "production";
  constructor(routes: Route[]) {
    this.app = express();
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.port = process.env.PORT || 5000;
    // this.connectToDatabase('mongodb://localhost:27017/myapp');
    console.log("ENV:", process.env.MONGODB_URI);
    this.connectToDatabase(process.env.MONGODB_URI || "");
    this.InitializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeMiddlewares() ;
    this.app.use(errorMiddleware);
  }
  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server is running on port ${this.port}`);
    });
  }

  public initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
  private InitializeMiddlewares() {
    if (this.production) {
      // Code to initialize production middlewares
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(cors({ origin: "*", credentials: true }));
      this.app.use(morgan("combined"));
    } else {
      // Code to initialize development middlewares
      this.app.use(morgan("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
      Logger.info("Development middlewares initialized");
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeMiddlewares() {
    this.app.use(errorMiddleware);
  }
  private connectToDatabase(uri: string) {
    // Code to connect to the database
    try {
      if (!uri) {
        throw Logger.error("Database URI is not defined");
      }
      mongoose.connect(uri);
      Logger.info("Connected to MongoDB");
    } catch (error) {
      Logger.error("Error connecting to MongoDB:", error);
    }
    Logger.info("Database connection attempt finished");
  }
}
export default App;
