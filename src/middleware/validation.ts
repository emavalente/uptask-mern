import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Este middleware se encarga de realizar la acción correspondiente si se detectan errores de validación.
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
