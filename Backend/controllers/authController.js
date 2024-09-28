import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exit with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        // Save the new user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        return res.status(201).json({
            message: "User created successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

// Login user

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorret email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        };

         // check role is correct or not
         if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exit with current role",
                success: false
            })
        };

        const tokenData = {
            userId: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}