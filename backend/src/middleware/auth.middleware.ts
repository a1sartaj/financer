import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';


export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.PG_Token;
        if (!token) {
            return res.status(401).json({ succuss: false, message: 'Unauthorized - No Token' })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string
        }

        (req as any).userId = decode.userId

        next()
    } catch (error) {
        console.error("Auth Error:", error)

        return res.status(401).json({
            message: "Unauthorized - Invalid Token"
        })
    }

}