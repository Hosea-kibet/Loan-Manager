// loan.extras.controller.ts
import { Request, Response } from 'express';
import * as loanExtrasService from '../services/loan.extras.service';
import { uploadFileToS3 } from '../utils/s3';


export const uploadDocumentController = async (req: Request, res: Response) => {
  const file = req.file;
  const { loanId, userId, type } = req.body;

   if (!file || !loanId || !userId || !type) {
    return res.status(400).json({ error: 'Missing required fields or file' });
   }

  try {
    const doc = await loanExtrasService.uploadDocument({
      loanId: Number(loanId),
      userId: Number(userId),
      type,
      file,
      status: 'PENDING',
    });

    return res.status(201).json(doc);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to upload document' });
  }
};


export const addGuarantorController = async (req: Request, res: Response) => {
  const { loanId, name, contact, relationship, userId } = req.body;

  if (!loanId || !name || !contact || !relationship || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const guarantor = await loanExtrasService.addGuarantor({
      loanId: Number(loanId),
      name,
      contact,
      relationship,
      userId: Number(userId),
    });

    return res.status(201).json(guarantor);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to add guarantor" });
  }
};

// loan.extras.controller.ts
export const addCollateralController = async (req: Request, res: Response) => {
  const { loanId, type, value, description, status = 'PENDING', userId } = req.body;

  if (!loanId || !type || !value || !userId) {
    return res.status(400).json({ error: 'loanId, type, value, and userId are required' });
  }

  try {
    const collateral = await loanExtrasService.addCollateral({
      loanId,
      type,
      value,
      description,
      status,
      userId,
    });

    return res.status(201).json(collateral);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to add collateral' });
  }
};


