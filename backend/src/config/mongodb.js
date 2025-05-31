import {MongoClient, ServerApiVersion} from 'mongodb'
import {env} from './environment.js'

let fitnesDatabaseInstance = null

//khởi tạo đối tượng connect tới mongoDB
const mongoClientIstance = new MongoClient(env.MONGODB_URI, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors:true
    }
})

export const CONNECT_DB = async() => {
    await mongoClientIstance.connect()

    fitnesDatabaseInstance=mongoClientIstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () =>{
    await mongoClientIstance.close()
}

export const GET_DB=() =>{
    if (!fitnesDatabaseInstance) throw new Error('Must connect to Database first!')
    return fitnesDatabaseInstance 
}

