import express from "express";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Tip from "../models/tipsModel.js";
import { isAuth, isAdmin } from "../utils.js";

const tipsRouter = express.Router();

// Get all tips
tipsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const tips = await Tip.find();
    res.send(tips);
  })
);

// Create a new tip
tipsRouter.post(
  "/",
  isAuth,
  isAdmin,
  [
    body("date").notEmpty().withMessage("Date is required"),
    body("time").notEmpty().withMessage("Time is required"),
    body("sport").notEmpty().withMessage("Sport is required"),
    body("league").optional().notEmpty().withMessage("League is optional"),
    body("odds")
      .isFloat({ gt: 1 })
      .withMessage("Odds must be a valid number greater than 1"),
    body("homeTeam").notEmpty().withMessage("Home team is required"),
    body("awayTeam").notEmpty().withMessage("Away team is required"),
    body("suggestedBet").notEmpty().withMessage("Suggested Bet is required"),
    body("outcome")
      .isBoolean()
      .withMessage("Outcome must be a boolean (true or false)"),
    body("analysis").optional().notEmpty().withMessage("Analysis is optional"),
    body("category").optional().notEmpty().withMessage("Category is optional"),
  ],
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTip = new Tip({
      date: req.body.date,
      time: req.body.time,
      sport: req.body.sport,
      league: req.body.league,
      teams: {
        home: req.body.homeTeam,
        away: req.body.awayTeam,
      },
      suggestedBet: req.body.suggestedBet,
      odds: req.body.odds,
      outcome: req.body.outcome,
      analysis: req.body.analysis,
      category: req.body.category,
    });

    const tip = await newTip.save();
    res.send({ message: "Tip Created", tip });
  })
);

// Update the outcome of a tip
tipsRouter.put(
  "/:id/outcome",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const tip = await Tip.findById(req.params.id);
    if (tip) {
      tip.outcome = req.body.outcome;
      await tip.save();
      res.send({ message: "Tip outcome updated", tip });
    } else {
      res.status(404).send({ message: "Tip Not Found" });
    }
  })
);

export default tipsRouter;
