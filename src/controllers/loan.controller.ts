import { Request, Response } from 'express';
import * as loanService from '../services/loan.service';

export const createLoan = async (req: Request, res: Response) => {
  const { deposit, instalment, interest } = req.body;

  if (!deposit || !instalment || !interest) {
    return res.status(400).json({ error: 'Fields deposit, instalment, and interest are required' });
  }

  try {
    const loan = await loanService.createLoan({ deposit, instalment, interest });
    return res.status(201).json(loan);
  } catch (err) {
    console.error('Create Loan Error:', err);
    return res.status(500).json({ error: 'Failed to create loan' });
  }
};

export const approveLoan = async (req: Request, res: Response) => {
  const { loanId } = req.body;

  if (!loanId) {
    return res.status(400).json({ error: 'loanId is required' });
  }

  try {
    const updated = await loanService.approveLoan(loanId);
    return res.status(200).json({ message: 'Loan approved', loan: updated });
  } catch (err) {
    console.error('Approve Loan Error:', err);
    return res.status(500).json({ error: 'Failed to approve loan' });
  }
};

export const assignLoanToUser = async (req: Request, res: Response) => {
  const { userId, loanId } = req.body;

  if (!userId || !loanId) {
    return res.status(400).json({ error: 'userId and loanId are required' });
  }

  try {
    const user = await loanService.assignUserToLoan({ userId, loanId });
    return res.status(200).json({ message: 'Loan assigned successfully', user });
  } catch (err: any) {
    console.error('Assign Loan Error:', err);
    return res.status(400).json({ error: err.message || 'Failed to assign loan to user' });
  }
};

export const getLoanForUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const loan = await loanService.getLoanForUser(userId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found for this user' });
    }

    return res.status(200).json(loan);
  } catch (err) {
    console.error('Get User Loan Error:', err);
    return res.status(500).json({ error: 'Failed to fetch user loan' });
  }
};

export const getLoanById = async (req: Request, res: Response) => {
  const loanId = Number(req.params.loanId);

  try {
    const loan = await loanService.getLoanById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    return res.status(200).json(loan);
  } catch (err) {
    console.error('Get Loan By ID Error:', err);
    return res.status(500).json({ error: 'Failed to fetch loan' });
  }
};
