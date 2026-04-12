import jwt from 'jsonwebtoken';
import type { Response } from "express"

export const generateJWTToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        // expiresIn: '7d',
        // expiresIn: '1m',
        expiresIn: '1h',
    })



    res.cookie("PG_Token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // maxAge: 1000 // 1 minutes
        maxAge: 60 * 60 * 1000 // 60 minutes
    })

    return token;

}
