import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passwordValidator from 'password-validator';

// Function to generate JWT token
const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });
};

// Schema for password validation
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(6)
    .is().max(30)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

// User registration endpoint
const register = async (req, res) => {
    try {
        const { fname, lname, email, username, password, avatar } = req.body;
        // Validation
        if (!fname || !lname || !email || !password || !username)
            return res.status(400).json({ message: "Invalid Data" });
        if (password.length < 6)
            return res.status(400).json({
                message: "Password should be a minimum of 6 characters",
            });
        // Check password complexity
        if (!passwordSchema.validate(password)) {
            return res.status(400).json({
                message: "Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            });
        }
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }
        // Create new user
        user = new User({ fname, lname, email, password, username, avatar });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        // Generate JWT token
        const token = generateToken(user);
        res.status(200).json({
            token,
            message: "User registered. Login to continue",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// User login endpoint
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validation
        if (!username || !password)
            return res
                .status(400)
                .json({ message: "Username and Password are required" });
        // Find user by username
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        // Generate JWT token
        const token = generateToken(user);
        // Send user details and token
        const sendUser = {
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            avatar: user.avatar,
        };
        res.status(200).json({
            token,
            user: sendUser,
            message: "Login successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export { register, login };
