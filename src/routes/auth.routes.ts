// src/routes/auth.route.ts
import { Router } from 'express';
import {  register } from '../controllers/auth.controller';
import { registerSchema } from '../validators/auth.schema';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));

export default router;
