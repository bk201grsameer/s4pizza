const { funcReturn, generateToken } = require("../middleware/utility");
const User = require("../model/UserSchema");
const brcypt = require("bcrypt");
const saltRounds = 10;
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("ALL FIELDS REQUIRED");
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("USER WITH THE EMAIL DOESNOT EXIST");
    if (!(await brcypt.compare(password, user.password)))
      throw new Error("INCORRECT PASSWORD");
    return res.json(
      funcReturn(true, {
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken({
          _id: user._id,
          email: user.email,
          name: user.name,
        }),
      })
    );
  } catch (error) {
    return res.json(funcReturn(false, error.message));
  }
};

module.exports.signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new Error("ALL FIELDS REQUIRED");
    const userExists = await User.findOne({ email: email });
    if (userExists) throw new Error("USER WITH THE EMAIL ALREADY EXISTS");
    const userData = new User({
      name: name,
      email: email,
      password: await brcypt.hash(password, saltRounds),
    });
    const user = await userData.save();
    return res.json(
      funcReturn(true, {
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken({
          _id: user._id,
          email: user.email,
          name: user.name,
        }),
      })
    );
  } catch (error) {
    console.log(error.message);
    return res.json(funcReturn(false, error.message));
  }
};

module.exports.getAllUserController = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(funcReturn(true, users));
  } catch (error) {
    return res.json(funcReturn(false, error.message));
  }
};
