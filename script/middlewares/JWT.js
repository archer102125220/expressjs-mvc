import jwt from 'express-jwt';

const secret = process.env.JWT_SECRET || 'secret12345';

export default jwt({ secret  /* PublicKey */ }).unless({ path: ['/']  /* 不需token */ });
