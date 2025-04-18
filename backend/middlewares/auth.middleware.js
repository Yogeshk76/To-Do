import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized, token not found',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  }
  catch (error) {
    return res.status(401).json({
      message: 'Unauthorized, invalid token',
    });
  }

};

export default authenticateUser;