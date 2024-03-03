import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Database ${con.connection.host}`);
  } catch (error) {
    console.log(`error is ${error}`);
  }
};

export default connectDB;
