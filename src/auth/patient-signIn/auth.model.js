const mongoose = require("mongoose");

const googleAuthModel = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    googleid:{
        type:String,
        required: true
    },
    addharCardNumber:{
        type:String
    },
    appointment:[
        {
            hospitalId:{
                type:String,
            },
            hospital:{
                type:String,
            },
            timeSlot:{
                type:String
            }
        }

    ]
});

module.exports = mongoose.model("googleAuthModel", googleAuthModel);
