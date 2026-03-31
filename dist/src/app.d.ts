import type { Route } from "@core/interfaces/index.js";
import express from 'express';
declare class App {
    app: express.Application;
    port: number | string;
    constructor(routes: Route[]);
    private initializeRoutes;
    listen(): void;
}
export default App;
//# sourceMappingURL=app.d.ts.map