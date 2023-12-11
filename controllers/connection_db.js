import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const URL = process.env.MONGODB_URL
const DB_NAME = process.env.DATABASE_NAME

const client = new MongoClient(URL)

export async function connectToDB(){
    let connection = null
    try{
        connection = await client.connect()
    }catch(e){
        console.error(e.message)
    }
    return connection
}

export async function disconnectFromDB(){
    try{
        await client.close()
    }catch(e){
        console.error(e)
    }
}

export async function connectToCollection(collectionName){
    try{
        const connection = await connectToDB()
        const db = connection.db(DB_NAME)
        const collection = db.collection(collectionName)
        return collection
    }catch(e){
        console.error(e.message)
    }
}