import { Request, Response } from 'express';
import * as loanTypeService from '../services/loanType.service';

export const createLoanTypesController = async (req: Request, res: Response) => {
    const { name, description, minAmount, maxAmount, interestRate, termMonths } = req.body;

    if (!name || !minAmount || !maxAmount || !interestRate || !termMonths) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const loanType = await loanTypeService.createLoanType({
            name,
            description,
            minAmount,
            maxAmount,
            interestRate,
            termMonths
        })

        return res.status(201).json(loanType);
    } catch (err: any) {
        return res.status(500).json({ error: err.message || 'Failed to create loan type' })
    }
}


export const getLoanTypesController = async (_req:Request, res:Response) => {
    const loanTypes = await loanTypeService.loanTypes();
    return res.status(200).json(loanTypes);
}