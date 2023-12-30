import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()
const port = 5000

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('working successfully')
})

export default app
