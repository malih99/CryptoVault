import { createBrowserRouter } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import DashboardPage from "../features/dashboard/DashboardPage";
import PortfolioPage from "../features/portfolio/PortfolioPage";
import StakingPage from "../features/staking/StakingPage";
import TransactionsPage from "../features/transactions/TransactionsPage";
import SettingsPage from "../features/settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "staking", element: <StakingPage /> },
      { path: "transaction", element: <TransactionsPage /> },
      { path: "setting", element: <SettingsPage /> },
    ],
  },
]);
