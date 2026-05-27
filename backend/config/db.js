import mongoose from 'mongoose';
export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://saimasaraswat2305_db_user:bumi123@cluster0.l2qcvuf.mongodb.net/Expense")
  .then(()=> console.log("Connected to MongoDB"))
}
