import { Router } from 'express';
import {
  appForLoan,
} from '../controllers/loan.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/apply', asyncHandler(appForLoan));


export default router;


