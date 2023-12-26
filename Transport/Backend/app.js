const express=require('express')
const mongoose=require('mongoose')
const userRouter=require('./router/user')
const bookingRouter=require('./router/booking')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var cors = require('cors')

require('dotenv').config();

const app=express();

app.use(cookieParser())
app.use('*',cors())


const connectToDb=()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('Connected to database');
    }).catch((e)=>{
        console.log("Can't connect to database",e)
    })
}

app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/booking', bookingRouter)

app.listen('3000',()=>{
    connectToDb()
    console.log('App is running on PORT 3000')
})