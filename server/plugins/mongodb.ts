import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()

  if (!config.mongodbUri) {
    console.warn('MONGODB_URI not configured - MongoDB connection skipped')
    return
  }

  try {
    await mongoose.connect(config.mongodbUri, {
      dbName: config.mongodbDbName || 'enrollgsrp'
    })

    nitroApp.hooks.hook('close', async () => {
      await mongoose.disconnect()
    })

    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw error
  }
})

export function getMongoose() {
  if (!mongoose.connection.readyState) {
    throw new Error('MongoDB not initialized')
  }
  return mongoose
}
