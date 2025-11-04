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

// ✅ فقط همین یک بار mockTx را اکسپورت کن
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
  {
    type: "swap",
    token: "ETH",
    amount: "+0.05 ETH",
    value: "$122.50",
    from: "ETH ⇄ SOL",
    hash: "mn045...pq678",
    time: "2025-10-08 18:45:10",
    status: "confirmed",
  },
  {
    type: "in",
    token: "BTC",
    amount: "+0.012 BTC",
    value: "$818.40",
    from: "2WsR...a4k9",
    hash: "stu081...vw234",
    time: "2025-10-08 09:20:33",
    status: "confirmed",
  },
  {
    type: "out",
    token: "SOL",
    amount: "-1.2 SOL",
    value: "$238.08",
    from: "5Lr3...8nHt",
    hash: "yza567...bc899",
    time: "2025-10-07 16:55:18",
    status: "confirmed",
  },
  {
    type: "in",
    token: "USDC",
    amount: "+500 USDC",
    value: "$500.00",
    from: "USDC ⇄ ETH",
    hash: "efg213...hij456",
    time: "2025-10-07 11:30:42",
    status: "confirmed",
  },
  {
    type: "in",
    token: "MATIC",
    amount: "+120 MATIC",
    value: "$60.00",
    from: "3Kp0...2vTr",
    hash: "klm789...nop812",
    time: "2025-10-06 20:12:55",
    status: "confirmed",
  },
  {
    type: "out",
    token: "ETH",
    amount: "-0.3 ETH",
    value: "$735.00",
    from: "6Fp9...55kv",
    hash: "qr345...tuv878",
    time: "2025-10-06 14:08:27",
    status: "pending",
  },
];

export const mockRecentActivity = [
  {
    id: 1,
    type: "receive",
    title: "Receive SOL",
    amount: +2.5,
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "send",
    title: "Send USDC",
    amount: -150,
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "swap",
    title: "Swapped ETH For SOL",
    amount: +0.05,
    time: "1 day ago",
  },
  {
    id: 4,
    type: "receive",
    title: "Receive BTC",
    amount: +0.012,
    time: "2 days ago",
  },
];

export const mockMarket = [
  { sym: "BTC", name: "Bitcoin", price: 68200, change: +2.45 },
  { sym: "ETH", name: "Ethereum", price: 2450, change: -1.23 },
  { sym: "SOL", name: "Solana", price: 198.4, change: +5.67 },
  { sym: "ADA", name: "Cardano", price: 0.52, change: +3.21 },
];

export const mockNews = [
  {
    id: 1,
    kind: "trend",
    title: "Bitcoin reaches new all-time high",
    desc: "BTC surpasses $68,000 with strong institutional support",
    time: "2 hours ago",
  },
  {
    id: 2,
    kind: "info",
    title: "Your Solana stake rewards are ready",
    desc: "+2.5 SOL earned from staking this week",
    time: "5 hours ago",
  },
  {
    id: 3,
    kind: "alert",
    title: "New device login detected",
    desc: "A new device accessed your account from New York",
    time: "1 day ago",
  },
];

// --- summary ماهانه برای Monthly Summary ---
export const mockTxMonthlySummary = [
  {
    id: "2025-10",
    monthLabel: "October 2025",
    sent: 3,
    received: 3,
    swapped: 2,
    totalVolume: "$4,119.48",
  },
  {
    id: "2025-09",
    monthLabel: "September 2025",
    sent: 5,
    received: 6,
    swapped: 3,
    totalVolume: "$7,585.50",
  },
  {
    id: "2025-08",
    monthLabel: "August 2025",
    sent: 4,
    received: 5,
    swapped: 2,
    totalVolume: "$5,730.25",
  },
];

export const mockTxFeesByMonth = [
  { month: "Jul", value: 12.45 },
  { month: "Aug", value: 18.92 },
  { month: "Sep", value: 15.34 },
  { month: "Oct", value: 22.18 },
];
