// db.js

const { MongoClient } = require('mongodb');

// MongoDB URI for your local database
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(uri);
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