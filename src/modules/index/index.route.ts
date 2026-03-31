import { Router } from 'express';
import type { Route } from '@core/interfaces/index';
import IndexController from './index.controller';


 export default class IndexRoute implements Route {
    public path = '/';
    public router = Router();
    public IndexController = new IndexController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path , this.IndexController.index);
    }
 }