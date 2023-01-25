const express = require('express');
const authRouter = require('./Router/authRouter');
const cookieParser = require('cookie-parser')
const app = express()


// To accept body
app.use(express.json())
// parse cookies
app.use(cookieParser())

app.use(express.static('public'))
app.use('/auth',authRouter)


app.listen(5000,(req,res)=>{
    console.log('server is listening')
})