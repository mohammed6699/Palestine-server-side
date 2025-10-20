import mongoose from "mongoose";
import userRole from "../configs/user.role.js";
import { hashSync } from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 20
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Invalid email format"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    media: {
        type: String
    },
    media_type: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
        required: true
    },
    role: {
        type: String,
        enum: [userRole.ADMIN, userRole.USER],
        default: userRole.USER
    }
},
{
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
        }
    }
});
userSchema.pre('save', function (next){
    if(!this.isModified('password')) return next();
    this.password = hashSync(this.password, 10);
    next();
})
const User = mongoose.model('User', userSchema);
export default User;