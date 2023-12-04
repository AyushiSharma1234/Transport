const express=require('express')
const mongoose=require('mongoose')
const userRouter=require('./router/user')
const bodyParser = require('body-parser')

require('dotenv').config();

const app=express();


const connectToDb=()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('Connected to database');
    }).catch((e)=>{
        console.log("Can't connect to database")
    })
}

app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen('3000',()=>{
    connectToDb()
    console.log('App is running on PORT 3000')
})