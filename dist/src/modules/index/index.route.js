import { Router } from "express";
import IndexController from "./index.controller.js";
export default class IndexRoute {
    constructor() {
        this.path = '/';
        this.router = Router();
        this.IndexController = new IndexController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.IndexController.index);
    }
}
//# sourceMappingURL=index.route.js.map