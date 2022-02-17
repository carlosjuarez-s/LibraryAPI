const mongoose = require('mongoose');

const personModel = mongoose.Schema({
    firstName: { type:String },
    lastName: { type:String },
    userName: { type:String },
    password: { type:String },
    email: { type:String },
    address: { type:String },
    phone: { type:Number }
})

module.exports = mongoose.model("Persons", personModel);