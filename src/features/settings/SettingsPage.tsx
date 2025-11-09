import { useState } from "react";
import Toggle from "../../components/ui/Toggle";
import SettingsSection from "./SettingsSection";
import SettingRow from "./SettingRow";
import { fieldBase } from "./settingsFieldBase";
import { useSettings, type ThemePreference } from "./useSettings";

export default function SettingsPage() {
  const { settings, update, resetToDefaults } = useSettings();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleThemeChange = (value: string) => {
    update("theme", value as ThemePreference);
  };

  const handleLanguageChange = (value: string) => {
    update("language", value === "fa" ? "fa" : "en");
  };

  const handleCurrencyChange = (value: string) => {
    update("currency", value === "eur" ? "eur" : "usd");
  };

  const handleSessionTimeoutChange = (value: string) => {
    const minutes = Number(value) as 15 | 30 | 60;
    update("sessionTimeoutMinutes", minutes);
  };

  const handleNetworkChange = (value: string) => {
    update(
      "defaultNetwork",
      value === "eth-mainnet" ? "eth-mainnet" : "sol-mainnet"
    );
  };

  const handleCustomRpcChange = (value: string) => {
    update("customRpc", value);
  };

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      window.alert("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      window.alert("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      window.alert("New password should be at least 8 characters.");
      return;
    }

    window.alert("Password updated (demo).");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAddWallet = () => {
    window.alert("This is a demo. Wallet connection is not implemented yet.");
  };

  const handleViewRecoveryPhrase = () => {
    window.alert(
      "Demo only – in a real app, you would verify the user and then show the recovery phrase in a secure modal."
    );
  };

  const handleExportPrivateKey = () => {
    window.alert(
      "Demo only – exporting real private keys should be done with strong security checks."
    );
  };

  const handleBackupData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      note: "Demo backup – replace with real portfolio/tx data in production.",
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearTxHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all transaction history? This cannot be undone (demo)."
      )
    ) {
      window.alert("Transaction history cleared (demo).");
    }
  };

  const handleDisconnectWallets = () => {
    if (
      window.confirm(
        "Disconnect all wallets from this dashboard? (demo – no real wallets are disconnected)"
      )
    ) {
      window.alert("All wallets disconnected (demo).");
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "This will permanently delete your account and all data (demo). Are you sure?"
      )
    ) {
      window.alert("Account deletion flow would start here (demo).");
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        "Reset all settings to their default values? This won't affect your assets. "
      )
    ) {
      resetToDefaults();
    }
  };

  return (
    <section className="space-y-6 mx-auto w-full max-w-[1280px] px-3 sm:px-0 pb-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your preferences, security, and integrations.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetAll}
          className="
            inline-flex items-center justify-center rounded-xl border
            border-slate-300 px-3 py-1.5 text-xs sm:text-sm
            text-slate-700 hover:bg-slate-50
            dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/60
          "
        >
          Reset to defaults
        </button>
      </div>

      {/* Appearance */}
      <SettingsSection
        title="Appearance"
        description="Manage how the dashboard looks and feels."
      >
        <SettingRow
          label="Theme"
          helper="Customize how the app looks."
          borderTop={false}
        >
          <select
            className={fieldBase}
            value={settings.theme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </SettingRow>

        <SettingRow label="Language" helper="Set your preferred language.">
          <select
            className={fieldBase}
            value={settings.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fa">Persian</option>
          </select>
        </SettingRow>

        <SettingRow
          label="Display Currency"
          helper="Used for portfolio valuation."
        >
          <select
            className={fieldBase}
            value={settings.currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
          >
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
          </select>
        </SettingRow>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        title="Notifications"
        description="Manage notification preferences."
      >
        <SettingRow
          label="Email Notifications"
          helper="Receive updates via email."
          borderTop={false}
        >
          <Toggle
            checked={settings.emailNotifications}
            onChange={(v) => update("emailNotifications", v)}
          />
        </SettingRow>
        <SettingRow
          label="Push Notifications"
          helper="Receive push notifications."
        >
          <Toggle
            checked={settings.pushNotifications}
            onChange={(v) => update("pushNotifications", v)}
          />
        </SettingRow>
        <SettingRow
          label="Transaction Alerts"
          helper="Get notified for all transactions."
        >
          <Toggle
            checked={settings.txAlerts}
            onChange={(v) => update("txAlerts", v)}
          />
        </SettingRow>
        <SettingRow
          label="Price Alerts"
          helper="Alert when prices hit targets."
        >
          <Toggle
            checked={settings.priceAlerts}
            onChange={(v) => update("priceAlerts", v)}
          />
        </SettingRow>
        <SettingRow
          label="Staking Rewards"
          helper="Notify when rewards are earned."
        >
          <Toggle
            checked={settings.stakingRewards}
            onChange={(v) => update("stakingRewards", v)}
          />
        </SettingRow>
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        title="Security"
        description="Manage security and authentication."
      >
        <SettingRow
          label="Two-Factor Authentication"
          helper="Add an extra layer of security."
          borderTop={false}
        >
          <Toggle
            checked={settings.twoFactor}
            onChange={(v) => update("twoFactor", v)}
          />
        </SettingRow>
        <SettingRow
          label="Biometric Authentication"
          helper="Use fingerprint or face ID."
        >
          <Toggle
            checked={settings.biometric}
            onChange={(v) => update("biometric", v)}
          />
        </SettingRow>
        <SettingRow
          label="Session Timeout"
          helper="Automatically log out after inactivity."
        >
          <select
            className={fieldBase}
            value={String(settings.sessionTimeoutMinutes)}
            onChange={(e) => handleSessionTimeoutChange(e.target.value)}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </SettingRow>

        {/* Change password */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="text-sm text-slate-900 dark:text-slate-100">
            Change Password
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <input
              type="password"
              placeholder="Current password"
              className={fieldBase}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              className={fieldBase}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className={fieldBase}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handlePasswordUpdate}
            className="
              mt-2 inline-flex items-center justify-center rounded-xl
              px-4 py-2 text-sm font-medium
              bg-emerald-600 text-white hover:bg-emerald-700
            "
          >
            Update Password
          </button>
        </div>
      </SettingsSection>

      {/* Network */}
      <SettingsSection
        title="Network"
        description="Configure blockchain networks."
      >
        <SettingRow
          label="Default Network"
          helper="Used for on-chain operations."
          borderTop={false}
        >
          <select
            className={fieldBase}
            value={settings.defaultNetwork}
            onChange={(e) => handleNetworkChange(e.target.value)}
          >
            <option value="sol-mainnet">Solana Mainnet</option>
            <option value="eth-mainnet">Ethereum Mainnet</option>
          </select>
        </SettingRow>
        <SettingRow
          label="Custom RPC Endpoint (Optional)"
          helper="Override default RPC URL."
        >
          <input
            className={`${fieldBase} w-full sm:w-80`}
            placeholder="https://api.mainnet-beta.solana.com"
            value={settings.customRpc}
            onChange={(e) => handleCustomRpcChange(e.target.value)}
          />
        </SettingRow>
      </SettingsSection>

      {/* Wallet Management */}
      <SettingsSection
        title="Wallet Management"
        description="Manage connected wallets and addresses."
      >
        <div className="space-y-3">
          {/* Main wallet */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-slate-900 font-semibold">
                M
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Main Wallet
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  7xKx...9mPq · Phantom
                </div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs dark:bg-emerald-900/40 dark:text-emerald-300">
              Active
            </span>
          </div>

          {/* Trading wallet */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-slate-900 font-semibold">
                T
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Trading Wallet
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  4eRk...1z97 · MetaMask
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddWallet}
            className="
              mt-1 inline-flex w-full items-center justify-center rounded-xl
              border border-dashed border-slate-300 dark:border-slate-700
              px-4 py-2 text-sm text-slate-600 dark:text-slate-300
              hover:bg-slate-50 dark:hover:bg-slate-800/60
            "
          >
            Add New Wallet
          </button>
        </div>
      </SettingsSection>

      {/* Backup & Recovery */}
      <SettingsSection
        title="Backup & Recovery"
        description="Secure your account with recovery options."
      >
        <SettingRow
          label="Recovery Phrase"
          helper="View and backup your 12-word recovery phrase."
          borderTop={false}
        >
          <button
            type="button"
            onClick={handleViewRecoveryPhrase}
            className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            View
          </button>
        </SettingRow>
        <SettingRow
          label="Export Private Key"
          helper="Download your private key (use with caution)."
        >
          <button
            type="button"
            onClick={handleExportPrivateKey}
            className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Export
          </button>
        </SettingRow>
        <SettingRow
          label="Backup Data"
          helper="Download all transaction and portfolio data."
        >
          <button
            type="button"
            onClick={handleBackupData}
            className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Backup
          </button>
        </SettingRow>
      </SettingsSection>

      {/* API & Integrations */}
      <SettingsSection
        title="API & Integrations"
        description="Manage API keys and connected applications."
      >
        <SettingRow
          label="Enable API Access"
          helper="Allow third-party integrations."
          borderTop={false}
        >
          <Toggle
            checked={settings.enableApiAccess}
            onChange={(v) => update("enableApiAccess", v)}
          />
        </SettingRow>

        <SettingRow label="API Key">
          <input
            readOnly
            value="********************"
            className={`${fieldBase} w-full sm:w-80`}
          />
        </SettingRow>

        <SettingRow label="Connected Applications">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            No connected applications
          </span>
        </SettingRow>
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        title="Privacy"
        description="Control your privacy and data sharing."
      >
        <SettingRow
          label="Hide Balance"
          helper="Hide portfolio value from display."
          borderTop={false}
        >
          <Toggle
            checked={settings.hideBalance}
            onChange={(v) => update("hideBalance", v)}
          />
        </SettingRow>
        <SettingRow
          label="Anonymous Analytics"
          helper="Help improve the app with anonymous data."
        >
          <Toggle
            checked={settings.anonymousAnalytics}
            onChange={(v) => update("anonymousAnalytics", v)}
          />
        </SettingRow>
        <SettingRow
          label="Show Transaction History"
          helper="Display recent transactions on dashboard."
        >
          <Toggle
            checked={settings.showTxHistory}
            onChange={(v) => update("showTxHistory", v)}
          />
        </SettingRow>
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection
        title="Danger Zone"
        description="Irreversible actions. Proceed with caution."
        className="
          border-rose-200 bg-rose-50/70
          dark:border-rose-500/60 dark:bg-rose-950/40
        "
      >
        <SettingRow
          label="Clear Transaction History"
          helper="Remove all transaction records from your account."
          borderTop={false}
        >
          <button
            type="button"
            onClick={handleClearTxHistory}
            className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-rose-300 text-rose-700 hover:bg-rose-100/80 dark:border-rose-500 dark:text-rose-300 dark:hover:bg-rose-900/60"
          >
            Clear
          </button>
        </SettingRow>
        <SettingRow
          label="Disconnect All Wallets"
          helper="Remove all connected wallet addresses."
        >
          <button
            type="button"
            onClick={handleDisconnectWallets}
            className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-rose-300 text-rose-700 hover:bg-rose-100/80 dark:border-rose-500 dark:text-rose-300 dark:hover:bg-rose-900/60"
          >
            Disconnect
          </button>
        </SettingRow>
        <SettingRow
          label="Delete Account"
          helper="Permanently delete your account and all data."
        >
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="rounded-xl px-3 py-1.5 text-xs sm:text-sm bg-rose-600 text-white hover:bg-rose-700"
          >
            Delete
          </button>
        </SettingRow>
      </SettingsSection>
    </section>
  );
}
