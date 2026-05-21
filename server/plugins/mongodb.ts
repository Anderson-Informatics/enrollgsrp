import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  
  if (!config.mongodbUri) {
    console.warn('MONGODB_URI not configured - MongoDB connection skipped')
    return
  }

  client = new MongoClient(config.mongodbUri)
  
  try {
    await client.connect()
    db = client.db(config.mongodbDbName || 'enrollgsrp')
    
    nitroApp.hooks.hook('close', async () => {
      await client?.close()
    })
    
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw error
  }
})

export function getMongoDb(): Db {
  if (!db) {
    throw new Error('MongoDB not initialized')
  }
  return db
}
