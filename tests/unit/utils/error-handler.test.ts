// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { AppError, handleError } from '../../../server/utils/error-handler'

describe('Error Handler', () => {
  it('should handle AppError correctly', () => {
    const error = new AppError(400, 'Bad request', true)
    const result = handleError(error)

    expect(result).toEqual({
      statusCode: 400,
      message: 'Bad request',
      isOperational: true
    })
  })

  it('should handle generic Error correctly', () => {
    const error = new Error('Generic error')
    const result = handleError(error)

    expect(result).toEqual({
      statusCode: 500,
      message: 'Internal server error',
      isOperational: false
    })
  })

  it('should handle unknown error type correctly', () => {
    const error = 'string error'
    const result = handleError(error)

    expect(result).toEqual({
      statusCode: 500,
      message: 'Unknown error occurred',
      isOperational: false
    })
  })

  it('should handle null error correctly', () => {
    const error = null
    const result = handleError(error)

    expect(result).toEqual({
      statusCode: 500,
      message: 'Unknown error occurred',
      isOperational: false
    })
  })

  it('should handle undefined error correctly', () => {
    const error = undefined
    const result = handleError(error)

    expect(result).toEqual({
      statusCode: 500,
      message: 'Unknown error occurred',
      isOperational: false
    })
  })

  it('should set isOperational to true by default in AppError', () => {
    const error = new AppError(404, 'Not found')
    expect(error.isOperational).toBe(true)
  })

  it('should allow setting isOperational to false in AppError', () => {
    const error = new AppError(500, 'Server error', false)
    expect(error.isOperational).toBe(false)
  })

  it('should preserve error stack trace in AppError', () => {
    const error = new AppError(400, 'Bad request')
    expect(error.stack).toBeDefined()
  })
})
