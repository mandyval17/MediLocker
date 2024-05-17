const mongoose = require("mongoose");

const doctorAuthHandler = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNo:{
    type: Number,
    required: true,
  },
  mobileNumber:{
    type:Number,
    required:true,
  },
  password:{
    type: String,
    required:true
  }

});


const doctorAuthHandlers = mongoose.model("doctorAuth", doctorAuthHandler);
module.exports = doctorAuthHandlers;