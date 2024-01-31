const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async(req,res)=>{
    const contact =  await Contact.find({user_ID : req.user.id});
    res.status(200).json(contact)
})


const getContact = asyncHandler(async(req,res)=>{
     const contact = await Contact.findById(req.params.id)
     if(!contact){
      res.status(404)
      throw new Error('Sorry! Could not find the ID :( ')
     }
    res.status(200).json(contact)
})

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
      throw new Error("All fields are mandatory !");
      
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_ID: req.user.id,
    });
  
    res.status(201).json(contact);
  });
  
const updateContact = asyncHandler(async(req,res)=>{
   
  const contact = await Contact.findById(req.params.id)
  
    if(!contact){
      res.status(404)
      throw new Error('Could not found')
    }

    if(contact.user_ID.toString() !== req.user.id){
      res.status(403)
      throw new Error('User do not have permission to update other user contacts')
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body , {
      new : true
    })
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async(req,res)=>{
  const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact){
      res.status(404)
      throw new Error('Contact Could not be found! :/ ')
    }
    if(contact.user_D.toString() !== req.user.id){
      res.status(403)
      throw new Error('User do not have permission to update other user contacts')
    } 
    await contact.deleteOne( req.params.id)
    res.status(200).json(contact)
})

module.exports = {getContacts , getContact, createContact,updateContact, deleteContact};


