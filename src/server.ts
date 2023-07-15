import app from './index'
import dotenv from 'dotenv'

dotenv.config()

export let port: number | string = process.env.PORT || 3001
app.listen(port, function() {
  console.log(`Running on http://localhost:${port}`)
})