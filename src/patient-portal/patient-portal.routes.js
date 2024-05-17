const router=require("express").Router();
const passport=require('passport')
const express=require('express')
const app=express()

app.use(passport.authenticate('session'));
const {patientReportHistory,changeConfirmation,checkConfirmation}=require("./patient-portal.handlers")

const authCheck=(req,res,next)=>{
    if(!(req.user)) return res.json("pleaseLoginFirst")
    else next()
}

router.get("/patientHistory",authCheck,patientReportHistory)

router.post("/changeConfirmation",authCheck,changeConfirmation)

router.get("/checkConfirmation",authCheck,checkConfirmation)

module.exports=router
