const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './config.env' });

const URI = process.env.ATLAS_URI;

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      console.log('Successfully connected to MongoDB Atlas');
      database = client.db('test_coords');
    } catch (error) {
      console.error(`Failed to connect to the database: ${error.message}`);
      throw error;
    }
  },
  getDB: () => {
    return database;
  },
};
