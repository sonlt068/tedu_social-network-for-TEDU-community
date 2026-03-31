import App from "./app.js";
import { IndexRoute } from "@cores/index/index.js";
const routes = [new IndexRoute()];
const app = new App(routes);
app.listen();
//# sourceMappingURL=server.js.map