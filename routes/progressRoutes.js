import express from "express";
import expressAsyncHandler from "express-async-handler";
import Progress from "../models/progressModel.js";
import { isAuth, isAdmin } from "../utils.js";

const progressRouter = express.Router();

// GET /api/progress - Retrieve all progress entries, with optional pagination and date filtering
// GET /api/progress - Retrieve all progress entries with optional date range filtering
progressRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { startDate, endDate, pageSize, pageNumber } = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const pageSizeNum = Number(pageSize) || 10;
    const pageNum = Number(pageNumber) || 1;

    const count = await Progress.countDocuments(filter);
    const progressData = await Progress.find(filter)
      .sort({ date: 1 })
      .skip(pageSizeNum * (pageNum - 1))
      .limit(pageSizeNum);

    res.send({
      progressData,
      page: pageNum,
      pages: Math.ceil(count / pageSizeNum),
    });
  })
);

// POST /api/progress - Create a new progress entry
progressRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      date,
      betAResult,
      betBResult,
      totalWinnings,
      rollOver,
      compoundingBalance,
      initialStake,
    } = req.body;

    if (!date || !betAResult || !betBResult || !initialStake) {
      return res.status(400).send({ message: "Required fields are missing." });
    }

    const newProgress = new Progress({
      date,
      betAResult,
      betBResult,
      totalWinnings,
      rollOver,
      compoundingBalance,
      initialStake,
    });

    const createdProgress = await newProgress.save();
    res
      .status(201)
      .send({ message: "Progress Entry Created", progress: createdProgress });
  })
);

// PUT /api/progress/:id - Update an existing progress entry by ID
progressRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const progress = await Progress.findById(req.params.id);
    if (progress) {
      progress.date = req.body.date || progress.date;
      progress.betAResult = req.body.betAResult || progress.betAResult;
      progress.betBResult = req.body.betBResult || progress.betBResult;
      progress.totalWinnings = req.body.totalWinnings || progress.totalWinnings;
      progress.rollOver =
        req.body.rollOver !== undefined ? req.body.rollOver : progress.rollOver;
      progress.compoundingBalance =
        req.body.compoundingBalance || progress.compoundingBalance;
      progress.initialStake = req.body.initialStake || progress.initialStake;

      const updatedProgress = await progress.save();
      res.send({
        message: "Progress Entry Updated",
        progress: updatedProgress,
      });
    } else {
      res.status(404).send({ message: "Progress Entry Not Found" });
    }
  })
);

// DELETE /api/progress/:id - Delete a progress entry by ID
progressRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const progress = await Progress.findById(req.params.id);
    if (progress) {
      await progress.remove();
      res.send({ message: "Progress Entry Deleted" });
    } else {
      res.status(404).send({ message: "Progress Entry Not Found" });
    }
  })
);

export default progressRouter;
