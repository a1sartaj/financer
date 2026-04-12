import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import financerRouter from './routes/financer.router.js'
import customerRouter from './routes/customer.router.js'
import cookieParser from 'cookie-parser';
import cors from "cors"
import { startAutoDeleteJob } from './cron/autoDeleteCustomers.js'

dotenv.config();
const app = express();
const PORT: Number = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(cookieParser());


// Enable CORS
const allowedOrigins: string | undefined = process.env.FRONTEND_URL
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Connect to mongoDb
connectDB();

// Cron Job
startAutoDeleteJob()

// Middleware


// Routes
app.use('/financer', financerRouter);
app.use('/customer', customerRouter);



app.get('/', (req: Request, res: Response) => {
    res.send('Hello Sartaj Alam')
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})