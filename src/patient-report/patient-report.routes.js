const { createReport, patientsReportHistort, doctorsReportHistory } = require("./patient-report.handlers");
const authToken=require("../../middleware/authToken")
const router=require("express").Router();


router.post("/",authToken,createReport)
router.get("/patientReport",authToken,patientsReportHistort)
router.get("/AllReport",authToken,doctorsReportHistory)



module.exports=router
