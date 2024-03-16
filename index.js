import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import Connect from './connect.js';
import userRoute from "./Routes/user.js"
import doctorRoute from "./Routes/doctor.js"
import reviewRoute from './Routes/review.js'



dotenv.config()


const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin : true
}
// midware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/doctors',doctorRoute)
app.use('/api/v1/reviews',reviewRoute)



app.get( '/', (req,res)=>{
    res.send('Api is working')
})




app.listen(port, ( )=>{
    console.log('server is running on port'+ port)
})
Connect()