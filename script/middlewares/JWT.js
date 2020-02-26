import jwt from 'express-jwt';
import jwtEncode from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret12345';/* PublicKey */

class JWTMiddleware {
    unless = (path) => {/* path:不需token */
        return jwt({ secret, requestProperty: 'auth' }).unless(path);
    }
    encode = (payload) => {
        return 'Bearer ' + jwtEncode.sign(payload, secret, { expiresIn: 3600 * 24 * 3 });
    }
}

export default new JWTMiddleware();
