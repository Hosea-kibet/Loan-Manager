import { Request, Response } from 'express';
import * as loanService from '../services/loan.service'


export const appForLoan = async(req:Request, res:Response) => {
  const {userId,typeId,amount} = req.body;
  if(!userId || !typeId || !amount) {
    return res.status(400).json({error: 'userId, typeId and amount are required'});
  }

  try {
      const loan = await loanService.applyForLoan({ userId, typeId, amount });
      return res.status(201).json({"message": "Loan application submitted successfully", loan});
  } catch (error:any) {
    return res.status(500).json({error: error.message || 'Failed to apply for loan'});
  }
};