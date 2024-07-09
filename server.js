import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import {dbConnect} from './databaseConnect/db.js';
dotenv.config();
const app=express();


//middlewares
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",process.env.FRONTEND_URL)
  res.setHeader("Access-Control-Allow-Methods","GET,POST")
  res.setHeader("Access-Control-Allow-Headers","Content-Type")

  next()
})
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true,
  
}));
app.use(cookieParser())

app.get('/',(req,res)=>{
  res.send('hello')
})

app.use('/api/v1/user',userRoute)
app.use('/api/v1/user-data',userRoute)


//mongo connection
dbConnect();


const port=process.env.PORT||8080;

app.listen(port,()=>{
   console.log(`Server running on port no. ${port}`);
})
