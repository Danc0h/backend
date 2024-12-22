import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

const tips = {
  "2024-10-11": [
    {
      sport: "Football",
      league: "Turkey super league",
      teams: {
        home: "Galatasaray",
        away: "Samsunspor",
      },
      suggestedBet: "Galatasaray Wins",
      time: "12:30",
      odds: 1.32,
      outcome: true,
    },
    {
      sport: "Basketball",
      league: "Lithuanian basketball league",
      teams: {
        home: "Neptunas Klaipeda",
        away: "Zalgiris Kaunas",
      },
      suggestedBet: "Zalgiris wins",
      time: "12:30",
      odds: 1.32,
      outcome: false,
    },
    {
      sport: "Football",
      league: "Italy Serie C",
      teams: {
        home: "Padova",
        away: "Novara",
      },
      suggestedBet: "Over 1.5 Goals",
      odds: 1.42,
      time: "12:30",
      outcome: false,
    },
  ],
  "2024-11-11": [
    {
      sport: "Football",
      league: "Turkey super league",
      teams: {
        home: "Galatasaray",
        away: "Samsunspor",
      },
      suggestedBet: "Galatasaray Wins",
      odds: 1.32,
      time: "12:30",
      outcome: true,
    },
    {
      sport: "Basketball",
      league: "Lithuanian basketball league",
      teams: {
        home: "Neptunas Klaipeda",
        away: "Zalgiris Kaunas",
      },
      suggestedBet: "Zalgiris wins",
      odds: 1.32,
      time: "12:30",
      outcome: false,
    },
    {
      sport: "Football",
      league: "Italy Serie C",
      teams: {
        home: "Padova",
        away: "Novara",
      },
      suggestedBet: "Over 1.5 Goals",
      odds: 1.42,
      time: "12:30",
      outcome: false,
    },
  ],
};
const progress = [
  {
    date: "2024-11-01",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424), // Initial 12800 rolled over
    initialStake: 3200,
  },
  {
    date: "2024-11-02",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584, // Only Bet A won
    rollOver: false,
    compoundingBalance: 12800 + 3584, // Bet A won, Bet B lost
    initialStake: 3200,
  },
  {
    date: "2024-11-03",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584, // Only Bet A won
    rollOver: false,
    compoundingBalance: 12800 + 3584, // Bet A won, Bet B lost
    initialStake: 3200,
  },
  {
    date: "2024-11-04",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 0, // Both bets lost
    rollOver: false,
    compoundingBalance: 12800 - 6400, // Lost both stakes
    initialStake: 3200,
  },
  {
    date: "2024-11-05",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424), // Rolled over winnings
    initialStake: 3200,
  },
  {
    date: "2024-11-06",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424) * 2, // Double roll-over
    initialStake: 3200,
  },
  {
    date: "2024-11-07",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 0, // Both bets lost
    rollOver: false,
    compoundingBalance: 12800 - 6400, // Lost both stakes
    initialStake: 3200,
  },
  {
    date: "2024-11-01",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424), // Initial 12800 rolled over
    initialStake: 3200,
  },
  {
    date: "2024-11-02",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584, // Only Bet A won
    rollOver: false,
    compoundingBalance: 12800 + 3584, // Bet A won, Bet B lost
    initialStake: 3200,
  },
  {
    date: "2024-11-03",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584, // Only Bet A won
    rollOver: false,
    compoundingBalance: 12800 + 3584, // Bet A won, Bet B lost
    initialStake: 3200,
  },
  {
    date: "2024-11-04",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 0, // Both bets lost
    rollOver: false,
    compoundingBalance: 12800 - 6400, // Lost both stakes
    initialStake: 3200,
  },
  {
    date: "2024-11-05",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424), // Rolled over winnings
    initialStake: 3200,
  },
  {
    date: "2024-11-06",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424) * 2, // Double roll-over
    initialStake: 3200,
  },
  {
    date: "2024-11-07",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 0, // Both bets lost
    rollOver: false,
    compoundingBalance: 12800 - 6400, // Lost both stakes
    initialStake: 3200,
  },
  {
    date: "2024-11-01",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424), // Initial 12800 rolled over
    initialStake: 3200,
  },
  {
    date: "2024-11-02",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584, // Only Bet A won
    rollOver: false,
    compoundingBalance: 12800 + 3584, // Bet A won, Bet B lost
    initialStake: 3200,
  },
  {
    date: "2024-11-03",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584, // Only Bet A won
    rollOver: false,
    compoundingBalance: 12800 + 3584, // Bet A won, Bet B lost
    initialStake: 3200,
  },
  {
    date: "2024-11-04",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 0, // Both bets lost
    rollOver: false,
    compoundingBalance: 12800 - 6400, // Lost both stakes
    initialStake: 3200,
  },
  {
    date: "2024-11-05",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424), // Rolled over winnings
    initialStake: 3200,
  },
  {
    date: "2024-11-06",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 3584 + 3424, // Both bets won
    rollOver: true,
    compoundingBalance: 12800 + (3584 + 3424) * 2, // Double roll-over
    initialStake: 3200,
  },
  {
    date: "2024-11-07",
    betAResult: 2.12,
    betBResult: 2.07,
    totalWinnings: 0, // Both bets lost
    rollOver: false,
    compoundingBalance: 12800 - 6400, // Lost both stakes
    initialStake: 3200,
  }
];

export default progress;

export { users, tips, progress };
