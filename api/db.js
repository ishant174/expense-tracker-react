const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI
const uri = process.env.MONGO_URI;

// Database Name
const dbName = process.env.MONGO_DB_NAME;

// Create a MongoClient instance
const client = new MongoClient(uri);

let db = null;

// Function to connect to MongoDB and store the database instance
async function connectToMongoDB() {
    if (db) {
        return db; // Return cached database instance if already connected
    }
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Export the connection function and client for closing (if needed)
module.exports = {
    connectToMongoDB,
    closeConnection: async () => {
        if (db) {
            await client.close();
            console.log('MongoDB connection closed');
            db = null;
        }
    }
};