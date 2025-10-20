// create new mertyr

import Joi from "joi";
import { ERROR, FAIL, SUCCESS } from "../configs/httpStatus.js";
import { imagekit } from "../configs/imgaekit.js";
import StatusCodes from "../configs/statusCodes.js";
import MartyrModel from "../models/martyrs.model.js";
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        gender:Joi.string().valid("male", "female").required(),
        city: Joi.string(),
        dateofdeath: Joi.date(),
        shortbio: Joi.string(),
        story: Joi.string()
    })
const createNewMertyr = async (req, res) => {
    try {
        const payload = await schema.validateAsync(req.body)
        const media = req.file;
        if(!media){
            return res.status(StatusCodes.BAD_REQUEST).json({
            status: FAIL,
            message: "No file uploaded"
            });
        }
        const response = await imagekit.upload({
            file: media.buffer,
            fileName: media.originalname,
            folder: "mertyrs"
        })
        if(!response){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: FAIL, message: 'Error adding the player image'})
        }
        
        const newMartyr = await MartyrModel.create({
            ...payload,
            imageUrl:response.url
        })
         res.status(StatusCodes.OK).json({status: SUCCESS, newMartyr});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: ERROR, message: error.message})
    }
}
// get all martyr
const getAllMartyr = async (req, res) => {
    try {
        const query = req.query;
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const martyrs = await MartyrModel.find().limit(limit).skip(skip)
        res.status(StatusCodes.OK).json({status:SUCCESS, martyrs})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:ERROR, message: error.message})
    }
}
// get martyr by id
const getMartyrById = async (req, res) => {
    try {
        const martyrId = req.params.id
        const martyr = await MartyrModel.findById(martyrId);
        if(!martyr){
            return res.status(StatusCodes.NOT_FOUND).json({status: FAIL, message: "Martyr not found"})
        }
        res.status(StatusCodes.OK).json({status:SUCCESS, martyr})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:ERROR, message: error.message})
    }
}
// upadte Martyr
const updateMartyr = async (req, res) => {
    try {
        const martyrId = req.params.id;
        const upadtedMartyr = await MartyrModel.findByIdAndUpdate(martyrId, 
            {$set: req.body},
            { new: true, runValidators: true })
            if(!upadtedMartyr){
                return res.status(StatusCodes.NOT_FOUND).json({status: FAIL, message: "Martyr not found"})
            }
            res.status(StatusCodes.OK).json({status: SUCCESS, upadtedMartyr})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:ERROR, message: error.message})
    }
}
// delete Martyr
const deleteMartyr = async (req, res) => {
    try {
        const martyrId = req.params.id;
        const deletedMartyr = await MartyrModel.findByIdAndDelete(martyrId);
        if(!deletedMartyr){
            return res.status(StatusCodes.NOT_FOUND).json({status: FAIL, message: "Martyr not found"})
        }
        res.status(StatusCodes.OK).json({status: SUCCESS, message: 'Martyr deleted Succefully'})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:ERROR, message: error.message})
    }
}
export {
    createNewMertyr,
    getAllMartyr,
    getMartyrById,
    updateMartyr,
    deleteMartyr
}