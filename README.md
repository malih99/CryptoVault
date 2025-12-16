# Crypto Portfolio & Transactions Dashboard

A modular React + TypeScript dashboard for managing a crypto portfolio and on-chain transactions, with a focus on UX, composable UI patterns, and production-like data flows (server-driven filters, pagination, and persisted user preferences).

> ⚠️ Note: This project is currently in progress.  
> The main implemented modules so far are **Settings** and **Transactions**.

---

## Features (current state)

### 🧩 Global Settings System

- Theme: `light`, `dark`, and `system` modes
  - Theme applied directly on `document.documentElement` and persisted in `localStorage`
- Localization:
  - Language selector (`en` / `fa`)
  - Display currency selector (`USD` / `EUR`)
- Notifications:
  - Email notifications
  - Push notifications
  - Transaction alerts
  - Price alerts
  - Staking rewards alerts
- Security:
  - 2FA toggle (two-factor auth)
  - Biometric auth toggle
  - Session timeout options (15 / 30 / 60 minutes)
  - Demo change-password flow with validation and feedback modal
- Network & Wallet:
  - Default network selector (Solana / Ethereum mainnet)
  - Custom RPC endpoint field
  - Wallet management section with active wallet badges and layout ready for real wallet integrations
- API & Privacy:
  - Enable/disable API access flag
  - API key display (masked)
  - Privacy options: hide balance, anonymous analytics, show/hide transaction history
- Backup & Danger Zone:
  - Demo backup download as JSON
  - “Danger Zone” section with:
    - Clear transaction history (with confirm dialog)
    - Disconnect all wallets (with confirm dialog)
    - Delete account (with confirm dialog and alert modal)

All settings are stored in `localStorage` and rehydrated on load via a custom `useSettings` hook.

---

### 💳 Transactions Module

#### Server-style state management

- Central `TransactionsPage` with:
  - **Search**, **type filter**, **token filter**, **status filter**
  - Sort by: `time`, `amount`, `value`
  - Pagination: page & pageSize (5 / 10 / 20 / 50)
- Filters, sort and pagination are wired into a single `useTransactionsQuery` hook so the API can be fully server-driven:
  - queryKey includes all list params
  - prepares the project for real backend integration with server-side pagination and filtering
- View state (filters + table params) is:
  - Synced to the URL via `URLSearchParams` (shareable links)
  - Persisted in `localStorage` (restored after refresh)

#### UI components

- **TxTable**

  - Responsive layout:
    - Card-style list for mobile/tablet
    - Data table for desktop
  - Per-row:
    - Type (in/out/swap) with colored badges and direction icons (↙, ↗, ⇄)
    - Token symbol, amount (with + / – sign depending on direction)
    - Fiat value formatted via a shared `formatCurrency` helper
    - From/To address (truncated)
    - Hash with copy-to-clipboard (and visual feedback state)
    - Status badge (confirmed/pending)
    - Optional “View details” action opening the details modal
  - Pagination footer:
    - “Showing X–Y of Z transactions”
    - Page size selector
    - Prev / Next controls with disabled states

- **TxFilter**

  - Search by token or transaction hash
  - Type filter (All / Sent / Received / Swapped)
  - Token filter (All + dynamic list from data)
  - Status filter (All / Confirmed / Pending)
  - Export CSV button (client-side export of the currently loaded rows)
  - **Clear filters** button:
    - Resets all filters to defaults (search, type, token, status)
    - Shows a small badge with the number of active filters

- **TxQuickFilters**

  - Pills (All, Received, Sent, Swapped, Pending)
  - One-click shortcuts that update both type + status filters in sync

- **TxAnalytics**

  - Transaction breakdown counts: Received / Sent / Swapped
  - Simple “bar” visuals based on the dominant category
  - Top tokens by activity (count of txs per token)
  - Fee analysis widget (using mock data for now):
    - Total fees over several months
    - Average monthly fees
    - Per-month bar visualization

- **TxMonthlySummary**

  - Monthly aggregated view: sent / received / swapped tx count per month
  - Total volume per month
  - Card-style responsive layout

- **TxDetailsModal**
  - Full-screen overlay modal with card content
  - Shows:
    - Type badge + status text (confirmed / pending)
    - Token + amount, timestamp
    - Amount and value (USD) blocks
    - From/To address with copy-to-clipboard
    - Transaction hash with copy-to-clipboard
  - ESC key closes the modal
  - “Copied” state per field with small icon feedback
  - Accessible markup (`role="dialog"`, `aria-modal="true"`)

---

## Tech Stack

- **Frontend**
  - React + TypeScript
  - Vite
  - React Router
  - TanStack Query (React Query)
  - Tailwind CSS
- **State & Data**
  - LocalStorage for settings and view preferences
  - URLSearchParams for deep-linkable list state
  - Custom hooks (`useSettings`, `useLocalStorage`, `useTransactionsQuery`)
- **API Layer**
  - `fetchJson` helper for API requests
  - `/api/transactions` endpoint (mocked for now, with graceful fallback to local mock data)

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm / yarn / npm (pick one and keep it consistent)
- Git

### Installation

```bash
# clone the repo
git clone https://github.com/malih99/CryptoVault.git
cd CryptoVault

# install dependencies
npm install   # or: yarn install / npm install
```

# start dev server

npm run dev

npm build
npm preview

src/
components/
tables/
TxTable.tsx # Responsive transactions table
ui/
Card.tsx
Button.tsx
Skeleton.tsx
Toggle.tsx
Modal.tsx
features/
settings/
SettingsPage.tsx
SettingsSection.tsx
SettingRow.tsx
useSettings.ts
transactions/
TransactionsPage.tsx
TxAnalytics.tsx
TxQuickFilters.tsx
TxMonthlySummary.tsx
TxDetailsModal.tsx
api.ts
types.ts
lib/
api/
client.ts # fetchJson helper
mock.ts # mock transactions & analytics data
format.ts
useLocalStorage.ts
