import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Tip from "../models/tipsModel.js";
import Progress from "../models/progressModel.js";
import { users, tips, progress } from "../data.js";

const seedRouter = express.Router();

// Seed the database with dummy data (users, tips, progress)
seedRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      // Clear existing data
      await User.deleteMany();
      await Tip.deleteMany();
      await Progress.deleteMany();

      // Insert sample data for users
      const createdUsers = await User.insertMany(users);

      // Flatten and insert tips data
      const allTips = [];
      for (const date in tips) {
        tips[date].forEach((tip) => {
          allTips.push({
            ...tip,
            date: new Date(date), // Ensure the date is correctly formatted
          });
        });
      }

      const createdTips = await Tip.insertMany(allTips);

      // Group tips by date
      const groupedTips = createdTips.reduce((acc, tip) => {
        const date = tip.date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(tip); // Add the tip under the correct date
        return acc;
      }, {});

      // Insert sample progress data
      const createdProgress = await Progress.insertMany(progress);

      // Send the grouped tips in the response
      res.send({
        message: "Data seeded successfully",
        users: createdUsers,
        tips: groupedTips, // Return grouped tips by date
        progress: createdProgress,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error seeding data", error: error.message });
    }
  })
);

export default seedRouter;
