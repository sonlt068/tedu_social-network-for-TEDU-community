import type { Route } from "../.@core/interfaces/index.js";
import IndexController from "./index.controller.js";
export default class IndexRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    IndexController: IndexController;
    constructor();
    private initializeRoutes;
}
//# sourceMappingURL=index.route.d.ts.map