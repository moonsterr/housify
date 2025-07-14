import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('.env') });

const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ success: false, data: 'token' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).send({ success: false, data: `invalid ${err}` });
    req.user = user;
    next();
  });
}

export default authenticateToken;
