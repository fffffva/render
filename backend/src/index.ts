import express, { type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import http from 'http'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { connectDB } from '../config/db'
import { logger } from './services/logger.service'

import { notFound } from '../middleware/errorMiddleware'
import { errorHandler } from '../middleware/errorMiddleware'

import { router as userRoutes } from '../api/user/router'
import { router as chatRoutes } from '../api/chat/router'
import { router as messageRoutes } from '../api/message/router'
import { setupSocketAPI } from './services/socket.service'
const app = express()
dotenv.config()
connectDB()
const server = http.createServer(app)

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.resolve(__dirname, '../build')))

      // Enable CORS for your Netlify URL
      const corsOptions = {
            origin: 'https://rolling-chat.netlify.app',
            credentials: true,
      }
      app.use(cors(corsOptions))
} else {
      // Your existing CORS setup for development
      const corsOptions = {
            origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
            credentials: true,
      }
      app.use(cors(corsOptions))
}
// app.get('/**', (_: Request, res: Response) => {
//       res.sendFile(path.join(__dirname, '../../../client', 'index.html'))
// })

app.use('/api/auth', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
setupSocketAPI(server)

// app.use(notFound)
// app.use(errorHandler)

const port = process.env.PORT || 5000

server.listen(port, () => logger.info(`Server running on port ${port}!`))