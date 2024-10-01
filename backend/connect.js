const { MongoClient, ServerApiVersion } = require('mongodb');

const URI = 'mongodb+srv://renz:zrSx9TiiUz73eW8U@cluster0.i1zg8zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; //this should be on env but for the sake of this assessment I will leave it here.

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
