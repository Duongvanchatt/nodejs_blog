import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/product';
import categoryRouter from './routes/categories';
import userRouter from './routes/auth';
import cors from 'cors';
const app = express()

// Middleware
app.use(express.json());
app.use(cors());

//router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
// connect database
mongoose.connect("mongodb://localhost:27017/we16306")
    .then(() => console.log("Connect db thanh cong"));
//connect
const port = 3002
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
