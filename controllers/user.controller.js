import StatusCodes from './../configs/statusCodes.js';
import { ERROR, FAIL, SUCCESS } from './../configs/httpStatus.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import { imagekit } from "../configs/imgaekit.js";
import User from '../models/user.model.js';
import Joi from 'joi';
dotenv.config();
    const schema = Joi.object({
        firstname: Joi.string().max(20).required(),
        lastname: Joi.string().max(20).required(),
        username:Joi.string().min(8).max(50).required(),
        email: Joi.string().regex(/.+\@.+\..+/).required(),
        password: Joi.string().required().min(8),
        media_type: Joi.string().valid('image', 'video').default('image').required(),
        role: Joi.string().valid('USER', 'ADMIN').default('USER')
    })
// register
const registerNewUser = async (req, res) => {
    try {
        const payload = await schema.validateAsync(req.body);
        const existingUser = await User.findOne({ 
            $or: [{ email: payload.email }, { username: payload.username }] 
            });
            if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                status: FAIL,
                message: "Email or username already exists"
            });
        }
        const media = req.file;
        if(!media){
            return res.status(StatusCodes.BAD_REQUEST).json({
            status: FAIL,
            message: "No file uploaded"
            });
        }
        if (!['image', 'video'].includes(payload.media_type)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
            status: FAIL,
            message: "Invalid media type"
            });
        }
        const response = await imagekit.upload({
            file: media.buffer,
            fileName: media.originalname,
            folder: "users"
        })
        if(!response){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: FAIL, message: 'Error adding the player image'})
        }
        const newUser = await User.create({
            ...payload,
            media:response.url
        })
    res.status(StatusCodes.OK).json({status:SUCCESS, newUser})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: ERROR, message: error.message})
    }
}
// login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email});
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({status: ERROR, message: 'Authentication Error'})
    }
    const enteredPass = await bcrypt.compare(password, user.password);
    if(!enteredPass){
        return res.status(StatusCodes.UNAUTHORIZED).json({status: ERROR, message: 'Authentication Error'})
    }
    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_TOKEN, {expiresIn: '1h'})
    user.token = token;
    res.status(StatusCodes.OK).json({status: SUCCESS, token})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: FAIL, message: error.message})
    }
}
// get all users
const getAllUsers = async (req, res) => {
    try {
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1)* limit 
        const users = await User.find().limit(limit).skip(skip);
        res.status(StatusCodes.OK).json({status: SUCCESS, users})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:ERROR, message: error.message})
    }
}
// get user by Id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);
        if(!user){
           return res.status(StatusCodes.NOT_FOUND).json({status: FAIL, message: "User not found"})
        }
        res.status(StatusCodes.OK).json({status: SUCCESS, user})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({status:FAIL, message: error.message})
    }
}
// update user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId,
            {$set: {...req.body}},
            {new: true}
        );
        if(!updatedUser){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: FAIL, message: 'User not found'})
        }
        res.status(StatusCodes.OK).json({status:SUCCESS, updatedUser})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:FAIL, message: error.message})
    }
}
// delete user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(StatusCodes.BAD_REQUEST).json({status:FAIL, message: 'cannot find user'})
        }
        res.status(StatusCodes.OK).json({status: SUCCESS, message: 'User deleted Succefully'})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: FAIL, message: error.message})
    }
}
export {
    registerNewUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}