import { Auth } from "./../node_modules/mongodb/src/mongo_client";
import App from "./app";
import { validateEnv } from "@core/utils";
import AuthRoute from "@modules/auth/auth.route";
import { IndexRoute } from "@modules/index";
import UsersRoute from "@modules/users/users.route";
validateEnv();
const routes = [
  new IndexRoute(),
  // Add more routes here
  new UsersRoute(),
  new AuthRoute(),
];
const app = new App(routes);
app.listen();
