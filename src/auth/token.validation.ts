import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try { verify(token, 'secret'); } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
};