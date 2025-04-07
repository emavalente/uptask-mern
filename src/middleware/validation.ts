import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Este middleware se encarga de realizar una acción si se detectan errores de validación de los datos ingresados desde el cliente.
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
