import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDataBase from './configs/DB.js';
import messageRouter from './routes/message.route.js';
import userRouter from './routes/user.route.js';
import martyrRouter from './routes/martyrs.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: ['https://palestine-server-side.vercel.app', 'http://localhost:5173', 'https://palestine-ceremony-web.vercel.app'],
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send('Server is Running')
});
app.use(express.json());
// routes
app.use('/api/v1', userRouter);
app.use('/api/v1', messageRouter);
app.use('/api/v1', martyrRouter);
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
// data base connection
connectToDataBase();
export default app;