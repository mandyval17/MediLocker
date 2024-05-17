const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const googleAuthModel = require("./auth.model");
const authModel = require("./auth.model");
require("dotenv").config()
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const task = await googleAuthModel.findById(id);
  done(null, task);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.callbackURL,
      clientID:process.env.clientID,
      clientSecret: process.env.clientSecret,
    },
    async (Accesstoken, refreshToken, profile, done) => {
      try {
        const task = await googleAuthModel.findOne({ googleid: profile.id });
        if (task == null) {
          const data = await googleAuthModel.create({
            googleid: profile.id,
            username: profile.displayName,
          });
          done(null, data);
          console.log(data);
        } else {
          console.log("already created");
          done(null, task);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

const addAddharCardNumber = async (req, res, next) => {
  try {
    console.log(req.user)
    const result = await authModel.findOneAndUpdate(
      { googleid: req.user.googleid },
      {
        addharCardNumber: req.body.addharCardNumber,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const pateintDetails=async(req,res,next)=>{
  try {
    console.log()
    const result=await authModel.find({googleid:req.user.googleid})
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = { addAddharCardNumber,pateintDetails };
