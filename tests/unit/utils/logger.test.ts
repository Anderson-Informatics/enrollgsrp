// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import { logger } from '../../../server/utils/logger'

describe('Logger', () => {
  it('should log info messages with timestamp', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    logger.info('Test message', { key: 'value' })

    expect(consoleSpy).toHaveBeenCalled()
    const logCall = consoleSpy.mock.calls[0]?.[0]
    const logEntry = JSON.parse(logCall || '{}')

    expect(logEntry.level).toBe('info')
    expect(logEntry.message).toBe('Test message')
    expect(logEntry.key).toBe('value')
    expect(logEntry.timestamp).toBeDefined()

    consoleSpy.mockRestore()
  })

  it('should log warn messages', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    logger.warn('Warning message')

    expect(consoleSpy).toHaveBeenCalled()
    const logCall = consoleSpy.mock.calls[0]?.[0]
    const logEntry = JSON.parse(logCall || '{}')

    expect(logEntry.level).toBe('warn')
    expect(logEntry.message).toBe('Warning message')

    consoleSpy.mockRestore()
  })

  it('should log error messages', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    logger.error('Error message', { error: 'details' })

    expect(consoleSpy).toHaveBeenCalled()
    const logCall = consoleSpy.mock.calls[0]?.[0]
    const logEntry = JSON.parse(logCall || '{}')

    expect(logEntry.level).toBe('error')
    expect(logEntry.message).toBe('Error message')
    expect(logEntry.error).toBe('details')

    consoleSpy.mockRestore()
  })

  it('should log debug messages', () => {
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    logger.debug('Debug message')

    expect(consoleSpy).toHaveBeenCalled()
    const logCall = consoleSpy.mock.calls[0]?.[0]
    const logEntry = JSON.parse(logCall || '{}')

    expect(logEntry.level).toBe('debug')
    expect(logEntry.message).toBe('Debug message')

    consoleSpy.mockRestore()
  })

  it('should handle log without meta data', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    logger.info('Message without meta')

    expect(consoleSpy).toHaveBeenCalled()
    const logCall = consoleSpy.mock.calls[0]?.[0]
    const logEntry = JSON.parse(logCall || '{}')

    expect(logEntry.message).toBe('Message without meta')
    expect(logEntry.level).toBe('info')

    consoleSpy.mockRestore()
  })
})
