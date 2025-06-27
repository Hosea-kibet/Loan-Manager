import { Router } from 'express';
import {
  createLoan,
  assignLoanToUser,
  getLoanForUser,
  getLoanById,
  approveLoan,
} from '../controllers/loan.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(createLoan));
router.post('/assign', asyncHandler(assignLoanToUser));
router.get('/user/:userId', asyncHandler(getLoanForUser));
router.get('/:loanId', asyncHandler(getLoanById));
router.post('/approve',asyncHandler(approveLoan))

export default router;


