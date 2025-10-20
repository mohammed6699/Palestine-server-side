import Joi from "joi";
import MessageModel from "../models/message.model.js";
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    body: Joi.string().min(3).required(),
    reason: Joi.string().valid('support','art','prayer','other').required()
})

// create new message
export const createMessage = async (req, res, next) => {
  try {
    const payload = await schema.validateAsync(req.body);
    const created = await MessageModel.create(payload);
    res.status(201).json({ success: true, data: created });
  } catch (err) { next(err); }
};
// list all messages
export const listMessages = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const items = await MessageModel.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await MessageModel.countDocuments();
    res.json({ success: true, data: items, meta: { total, page: parseInt(page) } });
  } catch (err) { next(err); }
};