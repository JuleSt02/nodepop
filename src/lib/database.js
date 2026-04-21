import mongoose from 'mongoose';

//MONGODB value from .env                   // fallback local dev safety 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';


export async function connectToDB() {
    const mongooseInstance = await mongoose.connect(MONGODB_URI, {
        dbName: process.env.DB_NAME || 'Project1'
    });

    console.log("Connected to MongoDB");
     
    //returning connection to later be able to acces connection.close, .name...etc
    return mongooseInstance.connection;
}