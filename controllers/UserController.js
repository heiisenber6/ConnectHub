const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async(req,res)=>{
    
    console.log('req.body is:' , req.body)
    const {username, email , password} = req.body
      
    if (!username || !email || ! password){
        res.status(400)
        throw new Error('All fields are mandatory')
      }
      const userAvailable = await User.findOne({email})
    
      if(userAvailable){
        res.status(400)
        throw new Error('User already exist!')
      }
      //hash the password!
    
      const hashedpassword = await bcrypt.hash(password, 10)
      console.log(hashedpassword)
    
      const createUser =  await User.create({
        username, email , password : hashedpassword
    }) 
    
    if(createUser){
        res.status(201).json({username, email })
    }else {
        res.status(400)
        throw new Error('User not valid')
    }
    res.status(201).json('Register the user')
})

const login = asyncHandler(async(req,res)=>{
     
  const {email , password} = req.body;
  
  const userr = await User.findOne({email})
  
  if(userr && (await bcrypt.compare(password , userr.password))){
    const accessToken = jwt.sign({
      user : {
        username : userr.username,
        email: userr.email,
        id : userr.id,
      }
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn : '20m'})
    res.status(201).json({accessToken})
  }
  
    res.json('Login the user')
})

const currentUser = asyncHandler(async(req,res)=>{
   const user = await User.find()
    res.status(200).json(user)

})

module.exports = { register,login,currentUser}
