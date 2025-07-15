import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password, roles } = req.body;
  const result = await authService.registerUser({ fullName, email, password, roles });
  return res.status(201).json(result);
};
