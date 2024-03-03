import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cors from "cors";
import formidableMiddleware from "express-formidable";
import path from "path";

//dot env config
dotenv.config();

//database Connection
connectDB();
//rest objrct
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(formidableMiddleware());
app.use(express.static(path.join(__dirname, "./client/build")));

//routing
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/contact", contactRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`app runing on ${PORT}`);
});
