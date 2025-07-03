import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readData, writeData } from "../utils/fileHandler.js";

// Register
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await readData("users");

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", error: true });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
    };
    users.push(newUser);
    await writeData("users", users);

    res
      .status(201)
      .json({ message: "User registered successfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await readData("users");
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", error: true });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", error: true });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User LogIn Successfully",
      token,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};
