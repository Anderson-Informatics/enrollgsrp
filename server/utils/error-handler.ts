export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational
    }
  }

  if (error instanceof Error) {
    console.error('Unexpected error:', error)
    return {
      statusCode: 500,
      message: 'Internal server error',
      isOperational: false
    }
  }

  return {
    statusCode: 500,
    message: 'Unknown error occurred',
    isOperational: false
  }
}
