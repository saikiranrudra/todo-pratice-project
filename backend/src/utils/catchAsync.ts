import { NextFunction, Request, Response } from "express";

// calls next with the error and the error is handled in app.ts 
export default (fn: (req: Request, res: Response, next: NextFunction) => any) => {
  return (req:Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  }
} 