// db.js

const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB URI for your local database
// const uri = process.env.MONGODB_URI | 'mongodb://localhost:27017';
const uri = "mongodb+srv://manishrana:XZxCSC2VNgCnMSuR@personaldb.ntldj.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = new MongoClient(uri, {
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