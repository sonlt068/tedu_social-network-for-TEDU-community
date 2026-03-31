export default class IndexController {
    constructor() {
        this.index = (req, res, next) => {
            try {
                res.status(200).send('Welcome to Tedu Social API');
            }
            catch (error) {
                next(error);
            }
        };
    }
}
//# sourceMappingURL=index.controller.js.map