import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createLoanTypesController, getLoanTypesController } from "../controllers/loanType.controller";



const router = Router();

router.post("/create", asyncHandler(createLoanTypesController));
router.get("/list", asyncHandler(getLoanTypesController));


export default router;