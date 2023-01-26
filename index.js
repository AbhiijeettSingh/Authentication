const express = require('express');
const authRouter = require('./Router/authRouter');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(cors());
// To accept body
app.use(express.json())
// parse cookies
app.use(cookieParser())

app.use(express.static('public'))
app.use('/auth',authRouter)


app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is listening on ${process.env.PORT}` )
})