import { Request, Response } from 'express';
import * as authService from  '../services/auth.service'

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password, roles } = req.body;

  const authHeader = req.headers.authorization;
  const token: string | null = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if(!token){
    res.status(401).json({error: 'Unauthorized: Missing or invalid token'});
  }

  try {
    const result = await authService.registerUser({fullName, email, password, roles, token: token ?? ''});
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

