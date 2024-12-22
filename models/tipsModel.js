import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true, // Ensure the date is provided
  },
  sport: {
    type: String,
    required: true, // Ensure sport is required (e.g., football, basketball)
  },
  league: {
    type: String,
    required: false, // League is optional, but can be added if available
  },
  teams: {
    home: {
      type: String,
      required: true, // Ensure the home team is required
    },
    away: {
      type: String,
      required: true, // Ensure the away team is required
    },
  },
  suggestedBet: {
    type: String,
    required: true, // Suggested bet must be specified
  },
  odds: {
    type: Number,
    required: true, // Odds must be provided
  },
  time: { type: String, required: true },
  scores: { type: String, required: true },
  outcome: {
    type: Boolean,
    required: true, // Outcome must be true or false
  },
});

// Create a model from the schema
const Tip = mongoose.model("Tip", tipSchema);

export default Tip;
