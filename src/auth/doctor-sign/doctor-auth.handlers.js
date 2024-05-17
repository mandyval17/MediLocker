const { default: axios } = require("axios");
const doctorAuthHandlers = require("./doctor-auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  try {
    const { registrationNo, name } = req.body;
    console.log(registrationNo, name);
    const getURL = `https://www.nmc.org.in/MCIRest/open/getPaginatedData?service=getPaginatedDoctor&start=0&length=500&search%5Bvalue%5D=&search%5Bregex%5D=false&registrationNo=${registrationNo}&name=${name}`;

    console.log(getURL)
    const result = await axios.get(getURL, "");
    const list = await result.data.data;
    if (list.length === 1) {
      const {
        password: plainTextPassword,
        confirmPassword,
        mobileNumber,
      } = req.body;
      const password = await bcrypt.hash(plainTextPassword, 10);
      console.log(confirmPassword, password);
      const chkPassword = await bcrypt.compare(confirmPassword, password);

      if (!chkPassword) {
        return res.status(404).json("password not matching");
      }

      const task = await doctorAuthHandlers.create({
        name,
        registrationNo,
        mobileNumber,
        password,
      });

      const token = jwt.sign(
        {
          id: task._id,
          registrationNo: task.registrationNo,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ accessToken: token });
    } else {
      res.status(404).json("Enter valid name/registration Number");
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { registrationNo, password } = req.body;

    const user = await doctorAuthHandlers.findOne({ registrationNo });

    if (!user) {
      return res.status(403).json("Wrong RegistrationNumber/Password");
    }

    const chkPassword = await bcrypt.compare(password, user.password);

    if (chkPassword) {
      const token = jwt.sign(
        {
          id: user._id,
          registrationNo: user.registrationNo,
          Name: user.name,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ accessToken: token });
    } else {
      return res.status(403).json("error");
    }
  } catch (error) {
    next(error);
  }
};

const doctorInfo = async (req, res, next) => {
  try {
    const result = await doctorAuthHandlers.find({
      registrationNo: req.userAuth.registrationNo,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login, doctorInfo };
