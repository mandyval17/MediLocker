const router=require("express").Router();
const passport=require('passport')
const express=require('express');
const { allHospitals, updateTimeSlot, cancelTimeSlot } = require("./hospital.handlers");
const app=express()

app.use(passport.authenticate('session'));
// const {}=require("./patient-portal.handlers")

const authCheck=(req,res,next)=>{
    if(!(req.user)) return res.json("pleaseLoginFirst")
    else next()
}

router.get("/allHospital",authCheck,allHospitals)

router.post("/updateTimeSlot",authCheck,updateTimeSlot)
router.post("/cancelTimeSlot",authCheck,cancelTimeSlot)


module.exports=router
