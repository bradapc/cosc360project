const { MongoClient } = require('mongodb');
require('dotenv').config();

if (!process.env.CONN_STR) {
    throw new Error("CONN_STR is not defined in environment variables");
}

const url = process.env.CONN_STR;

const databaseName = 'jobs';

let mongoClientInstance = null;

let maxPoolSize = 10;

const connectionOption = {
    maxPoolSize: maxPoolSize
}

async function connectToDb() {
    if (!mongoClientInstance) {
        mongoClientInstance = await MongoClient.connect(url, connectionOption);
    }

    return mongoClientInstance.db(databaseName);
}

module.exports = { connectToDb };