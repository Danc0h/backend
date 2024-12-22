import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    betAResult: {
      type: Number,
      required: true,
      // e.g., 2.16 for odds, or could store a boolean (true for win, false for loss)
    },
    betBResult: {
      type: Number,
      required: true,
      // Same as above, or boolean based on whether the bet won or lost
    },
    totalWinnings: {
      type: Number,
      required: true,
      // Total winnings from Bet A and Bet B combined
    },
    rollOver: {
      type: Boolean,
      required: true,
      // Indicates if the winnings were rolled over to the next day
    },
    compoundingBalance: {
      type: Number,
      required: true,
      // The accumulated balance after applying the strategy rules
    },
    initialStake: {
      type: Number,
      required: true,
      // The base stake amount for the day, e.g., 3200 KES
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
