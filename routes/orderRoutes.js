import express from "express";
import expressAsyncHandler from "express-async-handler";

const orderRouter = express.Router();

orderRouter.post(
  "/mpesa/callback",
  expressAsyncHandler(async (req, res) => {
    try {
      const { Body } = req.body;

      // Process the callback data here
      // You can update your order status in the database based on the response

      console.log("Mpesa Callback Data:", Body);

      res.status(200).send("Callback received");
    } catch (error) {
      console.error("Callback Error:", error);
      res.status(500).send({ message: error.message });
    }
  })
);

export default orderRouter;
