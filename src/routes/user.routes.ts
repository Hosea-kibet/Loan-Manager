import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getAllUsers));
router.get('/:id', asyncHandler(getUserById));

export default router;
