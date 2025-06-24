import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.status(200).json(user);
};
