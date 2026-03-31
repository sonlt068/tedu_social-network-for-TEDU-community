import express from 'express';
class App {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.initializeRoutes(routes);
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
export default App;
//# sourceMappingURL=app.js.map