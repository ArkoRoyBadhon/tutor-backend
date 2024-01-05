import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './app/routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import cookieParser from 'cookie-parser'

const app: Application = express()

// app.use(cors())

// app.use(
//   '*',
//   cors({
//     origin: true,
//     credentials: true,
//   }),
// )

const corsOptions = {
  // origin: "http://localhost:5173",
  origin: '*',
  methods: 'GET,HEAD,POST,PUT,PATCH,DELETE',
  credentials: true,
}

app.use(cors(corsOptions))

// parser
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
