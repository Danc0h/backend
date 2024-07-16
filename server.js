import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove the following line if you don't have a specific reason for it
    // tlsInsecure: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const app = express();

// Enable CORS for all routes
app.use(cors());

app.options("*", cors()); // Handle preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Define error handler for express
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
