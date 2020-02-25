import jwt from 'cors';

class JWTMiddleware {
    constructor(expressApp) {
        this.prototype = expressApp;
        // console.log(expressApp);
        // for (const key in expressApp) {
        //     console.log({ [key]: expressApp[key] });
        //     console.log(this.prototype);
        //     // this.prototype[key] = expressApp[key];
        // }
        // this.use(cors());
    }
}

export default JWTMiddleware;
