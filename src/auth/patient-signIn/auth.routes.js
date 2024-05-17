const router=require("express").Router();
const passport=require('passport')
const express=require('express')
const app=express()

app.use(passport.authenticate('session'));
const {addAddharCardNumber,pateintDetails}=require("./auth.handlers")



const authCheck=(req,res,next)=>{
    if(!(req.user)) return res.json("pleaseLoginFirst")
    else next()
}

router.get('/google/login',(req,res)=>{
    res.send(req.user)
    res.send("login")
})
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/auth/google')
})
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect("http://localhost:3000/dashboard-patient")
})

router.post('/addAddhar',authCheck,addAddharCardNumber)

router.get("/patient-details",authCheck,pateintDetails)

module.exports=router
