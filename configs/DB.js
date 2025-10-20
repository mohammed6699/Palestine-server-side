import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const dataBaseConnection = async() => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('data base connected')
        })
        await mongoose.connect(`${process.env.DATABASE_URL}/martyrs`)
    } catch (error) {
        console.log('error connected data base', error.message)
    }
}
export default dataBaseConnection