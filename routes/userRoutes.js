import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  isAuth,
  isAdmin,
  generateToken,
  generateOTP,
  sendOTP,
} from "../utils.js";

const userRouter = express.Router();

// Fetch all users with only name and email fields
userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({}, "name email"); // Only return name and email
    res.send(users);
  })
);

// Fetch a single user by ID with only name and email fields
userRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id, "name email"); // Only return name and email
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// Update a user by ID with only name and email fields allowed to be updated
userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // Only update name and email, remove other fields
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// Sign in route with only name, email, and token
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// Send OTP for registration (only include name, email, and password)
userRouter.post(
  "/send-otp",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body; // Only use name, email, and password
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = bcrypt.hashSync(otp, 10);

    // Send OTP to user's email
    await sendOTP(email, otp);

    res.send({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      hashedOTP,
    });
  })
);

// Verify OTP and create user (only name, email, and password are involved)
userRouter.post(
  "/verify-otp",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password, otp, hashedOTP } = req.body; // Only include name, email, and password

    const isOTPValid = bcrypt.compareSync(otp, hashedOTP);
    if (!isOTPValid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    // Create the user only after successful OTP verification
    const newUser = new User({
      name,
      email,
      password,
      isVerified: true,
    });

    const createdUser = await newUser.save();

    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

// Update user profile (only name, email, and password)
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

// Delete user by ID (no change needed here)
userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.deleteOne();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
