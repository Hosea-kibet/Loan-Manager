import { Router } from 'express';
import { upload } from '../middleware/upload';
import { addCollateralController, addGuarantorController, uploadDocumentController } from '../controllers/loan.extras.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/upload', upload.single('file'), asyncHandler(uploadDocumentController));
router.post('/add/guarantors', asyncHandler(addGuarantorController));
router.post('/add/collateral', asyncHandler(addCollateralController));

export default router;
