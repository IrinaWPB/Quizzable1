import app from './index'
import dotenv from 'dotenv'
import { port } from './config'
dotenv.config()

app.listen(port, function() {
  console.log(`Running on ${port}`)
})