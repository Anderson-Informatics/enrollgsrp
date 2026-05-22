import mongoose from 'mongoose'

const STATE_LABELS: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
}

export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: STATE_LABELS[mongoose.connection.readyState] ?? 'unknown'
  }
})
