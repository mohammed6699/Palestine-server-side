import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        enum: ['support','art','prayer','other'],
        default: 'support'
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    }
}, {
     toJSON: {
        transform: (doc, ret) => {
          delete ret.__v  
        }
    },
    timestamps: true
})

const MessageModel = mongoose.model('MessageModel', MessageSchema);
export default MessageModel;