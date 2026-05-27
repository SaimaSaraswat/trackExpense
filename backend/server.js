import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js'
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';



const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
connectDB();



//routes
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense" , expenseRouter);
app.use("/api/dashboard" , dashboardRouter)
app.get("/", (req,res)=>{
  res.send("Welcome to Expense Tracker API");
});


app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})
