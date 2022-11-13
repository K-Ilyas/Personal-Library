// config .env
require('dotenv').config();
const { MongoClient } = require("mongodb")

async function main(callback) {
    // const URI = process.env.MONGO_URI;
    const URI = process.env.MONGO_URI;
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // connect to mongodb cluster 
        await client.connect();
        // Make the appropriate DB calls
        await callback(client);
        console.log("Connect to the Database");
    }
    catch (e) {
        //cathc any errors
        console.log(e);
        throw new Error("Unable to Connect to the Database");
    }
}

module.exports = main;