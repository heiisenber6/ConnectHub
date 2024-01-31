const mongoose = require('mongoose')

const contactScheme = new mongoose.Schema({
    user_ID : {
          type : mongoose.Schema.Types.ObjectId,
          required: true,
          ref :  "Jojo",
    },
    name : {
        type : String,
        required :[true, 'Please add the contact name'],
        
    },
    email : {
        type : String,
        required :[true, 'Please add the email address'],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
      },
    },    
 {
  timestamps : true,
 }

)

module.exports = mongoose.model('ContactsJS' , contactScheme)