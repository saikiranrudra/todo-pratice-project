class AppError extends Error {
  statusCode: string;
  status: string;
  operational?: boolean;
  
  constructor(message: string|undefined, statusCode: string) {
    super(message)
    this.statusCode = statusCode;
    this.status = statusCode.startsWith('4') ? 'fail' : 'error';
    this.operational = true
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
