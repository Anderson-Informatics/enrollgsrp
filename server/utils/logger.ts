type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export function log(level: LogLevel, message: string, meta?: Record<string, any>) {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta
  }

  switch (level) {
    case 'error':
      console.error(JSON.stringify(logEntry))
      break
    case 'warn':
      console.warn(JSON.stringify(logEntry))
      break
    case 'debug':
      console.debug(JSON.stringify(logEntry))
      break
    default:
      console.log(JSON.stringify(logEntry))
  }
}

export const logger = {
  info: (message: string, meta?: Record<string, any>) => log('info', message, meta),
  warn: (message: string, meta?: Record<string, any>) => log('warn', message, meta),
  error: (message: string, meta?: Record<string, any>) => log('error', message, meta),
  debug: (message: string, meta?: Record<string, any>) => log('debug', message, meta)
}
