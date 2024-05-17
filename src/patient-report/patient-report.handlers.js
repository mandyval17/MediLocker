const reportModel = require("./patient-report.module");
const authModel=require("../auth/patient-signIn/auth.model")
const createReport = async (req, res, next) => {
  try {
    const { priscription, dignosis, remarks, patientAddharCardNumber } = req.body;
    const result = await reportModel.create({
      doctorRegistrationNo: req.userAuth.registrationNo,
      doctorName: req.userAuth.Name,
      priscription: priscription,
      dignosis: dignosis,
      remarks: remarks,
      patientAddharCardNumber:patientAddharCardNumber
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const patientsReportHistort = async (req, res, next) => {
  try {
    console.log(req.query)
    const {addharCardNumber} = req.query;
    console.log(addharCardNumber)
    const user=await authModel.find({addharCardNumber:req.query.addharCardNumber})
    console.log(user)
    if(user.length===0){
      return res.status(404).json("Patient Not found")
    }
    const result = await reportModel.find({patientAddharCardNumber:addharCardNumber});
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
const doctorsReportHistory = async (req, res, next) => {
  try {
    const result = await reportModel.find({doctorRegistrationNo:req.userAuth.registrationNo});
    res.json(result);
  } catch (error) {
    next(error);
  }
};




const login = async (req, res, next) => {};

module.exports = { createReport, patientsReportHistort,doctorsReportHistory };
