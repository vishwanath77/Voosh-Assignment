// const jwt = require("jsonwebtoken");
// const { UserModel } = require("../Models/User.model");
// require("dotenv").config();
// const bcrypt = require("bcrypt");

// const Signup = async (req, res) => {
//   try {
//     let { name, email, password } =  await req.body;
//     let existingUser = await UserModel.find({ email });
//     if (existingUser.length > 0) {
//       res.status(400).json({ msg: "USER ALREADY REGISTERED", status: false });
//     } else {
//       bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(password, salt, async function (err, hash) {
//           if (err) {
//             res.status(400).json({
//               msg: "SOMETHING WENT WRONG PLEASE TRY AGAIN",
//               status: false,
//             });
//           } else {
//             let new_user = await new UserModel({ name, email, password: hash });
//             await new_user.save();
//             res.status(200).json({ msg: "SIGNUP SUCCESS", status: true });
//           }
//         });
//       });
//     }
//   } catch (err) {
//     res
//       .status(400)
//       .json({ msg: "USER SIGNUP FAILED", error: err, status: false });
//   }
// };


const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.model");
require("dotenv").config();
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "USER ALREADY REGISTERED", status: false });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "SIGNUP SUCCESS", status: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "USER SIGNUP FAILED", error: err.message, status: false });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "EMAIL AND PASSWORD ARE REQUIRED", status: false });
    }

    // Find the user by email
    const registeredUser = await UserModel.findOne({ email });
    if (!registeredUser) {
      return res.status(404).json({
        msg: "USER NOT REGISTERED",
        status: false,
      });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, registeredUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        msg: "INCORRECT CREDENTIALS",
        status: false,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: registeredUser._id },
      process.env.SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration
    );

    return res.status(200).json({
      msg: "LOGIN SUCCESSFUL",
      status: true,
      token,
      user: { name: registeredUser.name, email: registeredUser.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "USER LOGIN FAILED",
      error: err.message,
      status: false,
    });
  }
};


// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const registeredUser = await UserModel.findOne({ email });

//     if (registeredUser) {
//       bcrypt.compare(password, registeredUser.password, function (err, result) {
//         if (err) {
//           return res.status(400).json({
//             msg: "SOMETHING WENT WRONG PLEASE TRY AGAIN",
//             status: false,
//           });
//         }
//         if (result) {
//           const token = jwt.sign(
//             { userId: registeredUser._id },
//             process.env.SECRET
//           );

//           return res.status(200).json({
//             msg: "Login successful",
//             status: true,
//             token,
//             user: { name: registeredUser.name, email: email },
//           });
//         } else {
//           return res.status(400).json({
//             msg: "INCORRECT CREDENTIALS",
//             status: false,
//           });
//         }
//       });
//     } else {
//       return res.status(400).json({
//         msg: "USER NOT REGISTERED",
//         status: false,
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({
//       msg: "USER LOGIN FAILED",
//       error: err,
//       status: false,
//     });
//   }
// };

module.exports = {
  Signup,
  Login
};