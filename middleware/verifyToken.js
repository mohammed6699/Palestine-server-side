import { ERROR, FAIL } from "../configs/httpStatus.js";
import StatusCodes from "../configs/statusCodes.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(StatusCodes.BAD_REQUEST).json({status:FAIL, message: 'Token is required'})
    }
    const reqToken = authHeader.split(" ")[1];
    try {
        const decodedToken = jwt.verify(reqToken, process.env.JWT_TOKEN)
        req.decodedToken = decodedToken;
        req.user = {id: decodedToken._id || decodedToken.id, role: decodedToken.role }
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({status: ERROR, message: error.message})
    }
}
export default verifyToken;