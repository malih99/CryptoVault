export const mockHoldings = [
  {
    sym: "BTC",
    name: "Bitcoin",
    price: 68200,
    qty: 0.12,
    value: 8184,
    change: 2.1,
  },
  {
    sym: "ETH",
    name: "Ethereum",
    price: 3420,
    qty: 2.45,
    value: 8379,
    change: 1.8,
  },
  {
    sym: "SOL",
    name: "Solana",
    price: 142,
    qty: 24.5,
    value: 3479,
    change: -0.5,
  },
  {
    sym: "USDC",
    name: "USD Coin",
    price: 1,
    qty: 2400,
    value: 2400,
    change: 0,
  },
  {
    sym: "MATIC",
    name: "Polygon",
    price: 0.85,
    qty: 1200,
    value: 1020,
    change: 3.2,
  },
];

export const mockLine = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: [22000, 23500, 21000, 22800, 24100, 23600, 24000][i % 7] + i * 70,
}));

export const mockTx = [
  {
    type: "in",
    token: "SOL",
    amount: "+2.5 SOL",
    value: "$495.50",
    from: "7xKx...9mPq",
    hash: "abc123...def456",
    time: "2025-10-09 14:32:45",
    status: "confirmed",
  },
  {
    type: "out",
    token: "USDC",
    amount: "-150 USDC",
    value: "$150.00",
    from: "9Kp2...7hQw",
    hash: "ghi789...jk012",
    time: "2025-10-09 12:15:22",
    status: "confirmed",
  },
];
