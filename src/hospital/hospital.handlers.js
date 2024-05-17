const hospitalModel = require("./hospital.models");
const authModel = require("../auth/patient-signIn/auth.model");

const allHospitals = async (req, res, next) => {
  try {
    const result = await hospitalModel.find();
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const updateTimeSlot = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body["10-12"] === true) {
      timeSlot = "10-12";
    } else if (req.body["12-14"] === true) {
      timeSlot = "12-14";
    } else if (req.body["16-18"] === true) {
      timeSlot = "16-18";
    } else if (req.body["14-16"] === true) {
      timeSlot = "14-16";
    }
    console.log(req.user.addharCardNumber);
    const data = await hospitalModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        "10-12": req.body["10-12"],
        "12-14": req.body["12-14"],
        "14-16": req.body["14-16"],
        "16-18": req.body["16-18"],
      },
      { new: true }
    );
    const result = await hospitalModel.findOne({ _id: req.body.id });
    await authModel.findOneAndUpdate(
      { addharCardNumber: req.user.addharCardNumber },
      {
        $push: {
          appointment: {
            hospitalId: result._id,
            hospital: result.hospitalName,
            timeSlot: timeSlot,
          },
        },
      }
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
const cancelTimeSlot = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await hospitalModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        "10-12": req.body["10-12"],
        "12-14": req.body["12-14"],
        "14-16": req.body["14-16"],
        "16-18": req.body["16-18"],
      },
      { new: true }
    );
    const result = await hospitalModel.findOne({ _id: req.body.id });
    console.log(result);
    await authModel.findOneAndUpdate(
      { addharCardNumber: req.user.addharCardNumber },
      {
        $pull: {
          appointment: {
            hospitalId: result._id,
            hospital: result.hospitalName,
            timeSlot: timeSlot,
          },
        },
      }
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { allHospitals, updateTimeSlot, cancelTimeSlot };
