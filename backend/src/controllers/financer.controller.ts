import { generateJWTToken } from "../jwt/generateJWTToken.js";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import financerModel from "../models/financer.model.js";



export const loginFinancer = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }


        const financer = await financerModel.findOne({ email: email.toLowerCase() });
        if (!financer) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, financer.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = generateJWTToken(financer._id.toString(), res)

        return res.status(200).json({
            success: true,
            message: 'Successfully login ',
            user: {
                id: financer._id,
                name: financer.name,
                email: financer.email

            }
        });

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logoutFinancer = async (req: Request, res: Response) => {
    try {

        res.clearCookie("PG_Token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        })

        return res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })

    } catch (error) {
        console.error("Logout Error:", error)

        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {

        const userId = (req as any).userId;
        const user = await financerModel.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully get me route',
            user
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({ success: false, message: 'Failed to get me route.' })
    }
}




// export const getAllFinancer = async (req, res) => {
//     console.log("get all financer func")

//     try {
//         const financer = await financerModel.find();

//         if (!financer) {
//             return res.json({ success: false, message: 'Financer not found' })
//         }

//         res.json({ success: true, financer })

//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// export const createFinancer = async (req, res) => {


//     const { name, email, password } = req.body;
//     try {
//         if (!name || !email || !password) {
//             return res.json({ success: false, message: "All fields are required" });
//         }
//         const financerExists = await financerModel.findOne({ email });
//         if (financerExists) {
//             return res.json({ success: false, message: "Financer already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)

//         const newFinancer = new financerModel({ name, email, password: hashedPassword });
//         const response = await newFinancer.save();
//         res.json({ success: true, newFinancer, response, message: 'successfully create financer' });
//     } catch (error) {
//         console.log(error)

//         res.json({ success: false, message: error.message });
//     }
// }


