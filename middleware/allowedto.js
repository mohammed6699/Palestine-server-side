import { FAIL } from "../configs/httpStatus.js"
import StatusCodes from "../configs/statusCodes.js"

export default (...role) => {
    return (req, res, next) => {
        if(!req.decodedToken.role){
            return res.status(StatusCodes.UNAUTHORIZED).json({status:FAIL, message: 'Not Auth user'})
        }
        next();
    }
}