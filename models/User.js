
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'personalBudgetTracker';
const client = new MongoClient(url);

async function createUser(userData) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        const { username, email } = userData;
        const existingUser = await collection.findOne({
            $or: [{ username: username }, { email: email }]
        });
        if (existingUser) {
            throw new Error('Username or email already exists.');
        }

   
        const result = await collection.insertOne(userData);
        return result;
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = {
    createUser
};
