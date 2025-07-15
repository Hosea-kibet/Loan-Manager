import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { formatZodError } from "../utils/zod";


export const validate = (schema: z.ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
              const formattedError = formatZodError(result.error);
            res.status(400).json( formattedError );
            return
        }

        next();
    }