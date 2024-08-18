import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });
    const savedUser = await user.save();

    // Create and save the customer
    const customer = new Customer({
      user: savedUser._id,
    });
    await customer.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token as an HttpOnly cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).send({
      message: "User registered successfully",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        firstName,
        lastName,
        phone,
        token
      },
    });
  } catch (e) {
    res.status(500).send({ message: `Server error: ${e.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email }).select("+password");
    if (!userExists) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: userExists._id, email: userExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    // Set the token as an HttpOnly cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: userExists._id,
        email: userExists.email,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        phone: userExists.phone,
        token
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
