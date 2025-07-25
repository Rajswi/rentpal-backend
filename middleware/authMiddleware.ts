import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/express';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;

    if (decoded && decoded.userId) {
      req.user = { userId: decoded.userId };
      next();
    } else {
      return res.status(403).json({ error: 'Token payload invalid' });
    }
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
