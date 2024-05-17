const { signUp, login, doctorInfo } = require("./doctor-auth.handlers");
const router=require("express").Router();
const authToken=require("../../../middleware/authToken")

router.post("/signUp",signUp)
router.post("/login",login)
router.get("/doctorInfo",authToken,doctorInfo)


module.exports=router
