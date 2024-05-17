const mongoose = require("mongoose");

const reportModel = new mongoose.Schema({
    doctorRegistrationNo:{
        type:Number,
        required:true
    },
    priscription:{
        type:String,
    },
    dignosis:{
        type:String,
        required: true
    },
    doctorName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    remarks:{
        type:String,
    },
    patientAddharCardNumber:{
        type:String,
        required:true
    },
    confirmation:{
        type:String,
        default:"Not verified"
    }
});

module.exports = mongoose.model("reportModel", reportModel);
