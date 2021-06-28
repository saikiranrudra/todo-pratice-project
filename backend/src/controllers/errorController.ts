import {Request, Response, NextFunction} from "express";
import AppError from "../utils/AppError";

interface errorType {
  statusCode: string,
  message?: string,
  status: string,
  name?: string,
  errors?: errorType[],
  code: number,
  path: string,
  value: string | number,
  errmsg: string,
  isOperations?: boolean 
}

const handleCasteErrorDB = (err: errorType): AppError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, "400");
}


const handleValidationErrorDB = (err: errorType): AppError  => {
  const errors = err.errors ? Object.values(err.errors).map(el => el.message) : [];

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, "400");
};

const sendError = (error:errorType | AppError, req: Request, res: Response):Response => {
  const statusCode = error.statusCode || "500";
  const message = error.message || "Something went wrong";
  const status = error.status || "error";
  return res.status(+statusCode).json({
    status: status,
    message: message
  })
}

const handleDuplicateFieldsDB = (err: errorType): AppError => {
  const values = err.errmsg.match(/(["'])(\\?.)*?\1/);
  let value = "";

  if(values && value.length > 0) {
    value = values[0];
  }

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, "400");
};

export default (err: errorType, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || "500";
  err.status = err.status || "error";
  
  let error: AppError | undefined;
  
  if(err.name === 'CastError') {
    error = handleCasteErrorDB(err);
  }

  if(err.code === 11000) {
    error = handleDuplicateFieldsDB(err)
  };

  if(err.name === 'ValidationError') {
    error = handleValidationErrorDB(err);
  }

  if(error) {
    sendError(error, req, res);
  } else {
    sendError(err, req, res);
  }


}