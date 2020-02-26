import jwt from 'express-jwt';
import jwtEncode from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret12345';

class JWTMiddleware {
    unless = () => {
        return jwt({ secret  /* PublicKey */, requestProperty: 'auth' }).unless({ path: ['/']  /* 不需token */ });
    }
    encode = (payload) => {
        return 'Bearer ' + jwtEncode.sign(payload, secret, { expiresIn: 3600 * 24 * 3 });
    }
}

export default new JWTMiddleware();
