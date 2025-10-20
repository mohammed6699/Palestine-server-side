import mongoose from "mongoose";
const MartyrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    city: {
        type: String
    },
    dateofdeath: {
        type: Date
    },
    shortbio: {
        type: String
    },
    story: {
        type: String
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    toJSON: {
        transform: (doc, ret) => {
          delete ret.__v  
        }
    },
    timestamps: true
})

const MartyrModel = mongoose.model('MartyrModel', MartyrSchema);
export default MartyrModel;