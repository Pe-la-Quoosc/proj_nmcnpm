import express from 'express'
import exitHook from 'async-exit-hook'
import {CONNECT_DB, GET_DB, CLOSE_DB} from './config/mongodb.js'
import 'dotenv/config'
import {env} from './config/environment.js'
import {APIs_V1} from './routes/v1/index.js'

const START_SERVER= () =>{
  const app = express()

  app.use('/v1',APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3.Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('4.Server is shutting down...')
    CLOSE_DB()
    console.log('5.Disconnected to MongoDB Cloud Atlas!')
  })
}


(async () => {
  try{
    console.log('1.Connecting to MongoDB Cloud Atlas...')
    console.log('--- Starting connection ---');
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas!')
    START_SERVER()
  }
  catch (error) {
    console.error(error)
    process.exit(0)
  }
  })()
