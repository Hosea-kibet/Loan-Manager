import { Router } from 'express';
import {
  createLoan,
  assignLoanToUser,
  getLoanForUser,
  getLoanById,
} from '../controllers/loan.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(createLoan));
router.post('/assign', asyncHandler(assignLoanToUser));
router.get('/user/:userId', asyncHandler(getLoanForUser));
router.get('/:loanId', asyncHandler(getLoanById));

export default router;


