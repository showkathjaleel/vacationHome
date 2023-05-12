const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doten = require("dotenv").config();


function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}

module.exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(400).json({ msg: "Email already used. " });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(userDoc);
  } catch (e) {
    res.status(422).json({ error: e.message });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    console.log(req.body,'1111111111')
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const passOk = await bcrypt.compare(password, userDoc.password);
    if (!passOk) {
      return res.status(400).json({ msg: "Invlaid Credentials" });
    }
    console.log(passOk,'2222222222')
    const accessToken = generateAccessToken(userDoc._id);
    // jwt.sign(
    //   { email: userDoc.email, id: userDoc._id },
    //   process.env.JWT_SECRET_KEY ,
    //   {},
    //   (err, token) => {
    //     if (err) throw err;
    //     res.cookie("token", token).json(userDoc);
    //   }
    // );
     console.log(accessToken,'2222222222')
     res.status(200).json({ accessToken :accessToken, userDoc:userDoc});
  } catch (err) {
    console.log(err);
  }
};
