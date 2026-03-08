const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.CONN_STR) {
    throw new Error("CONN_STR is not defined in environment variables");
}

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.CONN_STR, {
            maxPoolSize: 10,
            dbName: 'jobs'
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Database connection failed: ", err);
        process.exit(1);
    }
}

module.exports = { connectToDb };