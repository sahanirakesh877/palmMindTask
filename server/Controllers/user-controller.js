const User = require("../Models/UserSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY || "palmMind123";

// -------------------registration process-----------
const register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User register successfully",
      newUser: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------login processs-------------
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

 
  const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRETE_KEY, {
    expiresIn: "4h", 
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 86400),
  
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    userID: user._id,
  });
});

//--------------------logout user-------------
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});


//  reset or forget password  logic
const forgetpassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found in this email" });
    }
    const resetToken = jwt.sign(
      { id: existingUser._id.toString() },
      process.env.JWT_SECRETE_KEY,
      {
        expiresIn: "4h", 
      }
    );

    // Set up Node Mailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sahanirakesh877@gmail.com",
        pass: "pnvh gmbs hzrd wdzc",
      },
    });
   
    const mailOptions = {
      from: "sahanirakesh877@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: ` http://localhost:5173/resetpassword/${existingUser._id}/${resetToken}`,
      html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${existingUser.name},</p>
      <p>You have requested a password reset. Please click the following link to reset your password:</p>
      <a href="http://localhost:5173/resetpassword/${existingUser._id}/${resetToken}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Email could not be sent" });
      }
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ message: "Password reset link sent successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { id, resetToken } = req.params;
    const { password } = req.body;

    console.log("Received ID:", id);
    console.log("Received Token:", resetToken);

    jwt.verify(
      resetToken,
      process.env.JWT_SECRETE_KEY,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
      }
    );


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------- get  all user details   ------------------------------------r
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------- get  singleuser details   ------------------------------------r
const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------- get  singleuser details   ------------------------------------r
const deleteSingleUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true,  message: "User deleted successfully", });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ---------------------update user--------------------
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields based on request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  register,
  login,
  logout,
  getUser,
  getSingleUser,
  updateUser,
  deleteSingleUser,
  resetPassword,
  forgetpassword,
};
