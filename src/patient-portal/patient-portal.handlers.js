const reportModel = require("../patient-report/patient-report.module");

const patientReportHistory = async (req, res, next) => {
  try {
    const result = await reportModel.find({
      patientAddharCardNumber: req.user.addharCardNumber,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const checkConfirmation = async (req, res, next) => {
  try {
    console.log( req.user.addharCardNumber)
    const result = await reportModel.find({patientAddharCardNumber: req.user.addharCardNumber});
    const verified = [];
    const notVerified = [];
    result.forEach((data) => {
      if (data.confirmation === "Not verified") {
        notVerified.push(data);
      } else {
        verified.push(data);
      }
    });
    res.json({ verified: verified, notVerified: notVerified, all: result });
  } catch (error) {
    next(error);
  }
};

const changeConfirmation = async (req, res, next) => {
  try {
    console.log(req.body.id)
    const result = await reportModel.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        confirmation: "Verified",
      },
      { new: true }
    );
    res.json(result)
    
  } catch (error) {
    res.json(error)
  }
};





module.exports={patientReportHistory,changeConfirmation,checkConfirmation}