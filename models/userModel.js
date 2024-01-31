const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Please add your name']
    },
    email : {
        type : String,
        required : [true, 'Please add your email'],
        unique : [true, 'email address already taken']
    },
     password : {
        type : String,
        required : [true, 'Please add your Phone']
    },
},
    {
     timestamps : true,
    }
)


module.exports = mongoose.model('User' , userSchema)

