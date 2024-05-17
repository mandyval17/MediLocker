const mongoose = require("mongoose");

const hospitalModel = new mongoose.Schema({
    hospitalName:{
        type:String,
        required:true
    },
    "10-12":{
        type:Boolean,
        default:false
    },
    "12-14":{
        type:Boolean,
        default:false
    },
    "14-16":{
        type:Boolean,
        default:false
    },
    "16-18":{
        type:Boolean,
        default:false
    },
    patientAddharCard: {
        type: String
    }
      
});

module.exports = mongoose.model("hospitalModel", hospitalModel);
