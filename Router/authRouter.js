const express = require('express');
const User = require('../Models/UserModels');
const bcrypt = require('bcrypt');
const {validateName, validateEmail, validatePassword} = require('../utils/validators');
console.log(User)
const jwt = require('jsonwebtoken');
const fs = require('node:fs')
const path = require('node:path')

const SECRET_KEY = '123456789qwertyuioasdfgcvbnmjetubk';

const authRouter = express.Router();

authRouter.post('/signup',async (req,res)=>{
    try{
        const {name,email,password} = req.body
        console.log(name,email,password)
        const userExist = await User.findOne({
            where:{
                email
            }
        })
        
        if(userExist){
            console.log('user already Exist')
            return res.status(404).send('User already Exist')
        }

        if(!validateName(name)){
            return res.status(404).send('Enter Valid name')
        }
        if(!validateEmail(email)){
            return res.status(404).send('Enter Valid email')
        }
        if(!validatePassword(password)){
            return res.status(404).send('Enter password in Correct form')
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword);
        
        const createdUser = await User.create({
            name,
            email,
            password:hashedPassword
        })
        console.log(createdUser.id)
        const token = await jwt.sign({
            id: createdUser.id
        },SECRET_KEY)

        res.cookie('authToken',token,{httpOnly:true})
        return res.status(200).send(createdUser);

    }catch(e){
        console.log(e);
        return res.status(500).send('Internal server error. something went wrong')
    }
   
})

authRouter.post('/signin', async (req,res)=>{
    const {email, password} = req.body
    const userExist = await User.findOne({
        where:{
            email
        }
    })

    if(!userExist){
        console.log('User does not Exist')
        return res.status(404).send('User does not Exist')
    }

    const MatchPass = bcrypt.compareSync(password, userExist.password)

    if(!MatchPass){
        console.log('wrong password')
        return res.status(404).send('Invalid User name and Password')
    }

    const token = jwt.sign({
        id: userExist.id
    },SECRET_KEY)

    res.cookie('authToken',token,{httpOnly: true})
    res.status(200).redirect('/protected')
    
})

authRouter.get('/protected',(req,res)=>{
    let token = req.cookies.authToken;
    let isVerified = jwt.verify(token, SECRET_KEY);

    if(!isVerified){
        return res.status(404).send('You cannot access protected route')
    }else{
        console.log(path.join(__dirname + "/../" + "Private/Krishna.html"))
        return res.sendFile(path.join(__dirname + "/../" + "Private/Krishna.html"))
        
    }

})
console.log(__dirname)
module.exports = authRouter