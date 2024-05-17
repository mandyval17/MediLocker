require("dotenv").config()
const express = require("express");
const morgan=require("morgan")
const app = express();
const connectDB = require("./dbconnct");
const patientAuthRoute=require("./src/auth/patient-signIn/auth.routes")
const doctorAuthRoute=require("./src/auth/doctor-sign/doctor-auth.routes")
const patientPortal=require("./src/patient-portal/patient-portal.routes")
const hospitalRoute=require("./src/hospital/hospital.routes")
const passportSetup=require('./src/auth/patient-signIn/auth.handlers')

const cookieSession=require('cookie-session')
const passport=require('passport');
const createReportRoute  = require("./src/patient-report/patient-report.routes");
const cors=require("cors")
app.use(cors(({credentials:true, origin : "http://localhost:3000"})))
app.use(express.json());


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['abcdefghi']
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(morgan("dev"))
app.use("/auth",patientAuthRoute)
app.use("/doctor/auth",doctorAuthRoute)
app.use("/doctor/report",createReportRoute)
app.use("/patient",patientPortal)
app.use("/hospital",hospitalRoute)

app.get("/",(req,res)=>{
    res.json("hello")
    console.log('hello')
})
const start = async() => {
    try {
        connectDB(process.env.MONGO_URI)
        console.log(process.env.NODE_ENV)
        app.listen(5000, () => {
            console.log("Server is listening on port " + 5000);
        });
    } catch (error) {
        console.log(error);
    }
}

start();