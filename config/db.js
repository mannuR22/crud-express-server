// db.js

const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODB_URI } = require('./environment');
console.log(MONGODB_URI)
// MongoDB URI for yourprocess.env.API_KEY local database

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  try {
    
    await client.connect();
    const database = client.db('crudAppdb');
    cachedDb = database;
    console.log('MongoDB Connected')
    return database;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;