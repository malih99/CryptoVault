import Toggle from "../../components/ui/Toggle";
import SettingsSection from "./SettingsSection";
import SettingRow from "./SettingRow";
import { fieldBase } from "./settingsFieldBase";

export default function SettingsPage() {
  return (
    <section className="space-y-6 mx-auto w-full max-w-[1280px]">
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
          <select className={fieldBase} defaultValue="dark">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </SettingRow>

        <SettingRow label="Language" helper="Set your preferred language.">
          <select className={fieldBase} defaultValue="en">
            <option value="en">English</option>
            <option value="fa">Persian</option>
          </select>
        </SettingRow>

        <SettingRow
          label="Display Currency"
          helper="Used for portfolio valuation."
        >
          <select className={fieldBase} defaultValue="usd">
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
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow
          label="Push Notifications"
          helper="Receive push notifications."
        >
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow
          label="Transaction Alerts"
          helper="Get notified for all transactions."
        >
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow
          label="Price Alerts"
          helper="Alert when prices hit targets."
        >
          <Toggle />
        </SettingRow>
        <SettingRow
          label="Staking Rewards"
          helper="Notify when rewards are earned."
        >
          <Toggle defaultChecked />
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
          <Toggle />
        </SettingRow>
        <SettingRow
          label="Biometric Authentication"
          helper="Use fingerprint or face ID."
        >
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow
          label="Session Timeout"
          helper="Automatically log out after inactivity."
        >
          <select className={fieldBase} defaultValue="30">
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
            />
            <input
              type="password"
              placeholder="New password"
              className={fieldBase}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className={fieldBase}
            />
          </div>
          <button
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
          <select className={fieldBase} defaultValue="sol-mainnet">
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
          />
        </SettingRow>
      </SettingsSection>

      {/* Wallet Management */}
      <SettingsSection
        title="Wallet Management"
        description="Manage connected wallets and addresses."
      >
        {/* Main wallet */}
        <div className="space-y-3">
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
          <button className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
            View
          </button>
        </SettingRow>
        <SettingRow
          label="Export Private Key"
          helper="Download your private key (use with caution)."
        >
          <button className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
            Export
          </button>
        </SettingRow>
        <SettingRow
          label="Backup Data"
          helper="Download all transaction and portfolio data."
        >
          <button className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
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
          <Toggle />
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
          <Toggle />
        </SettingRow>
        <SettingRow
          label="Anonymous Analytics"
          helper="Help improve the app with anonymous data."
        >
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow
          label="Show Transaction History"
          helper="Display recent transactions on dashboard."
        >
          <Toggle defaultChecked />
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
          <button className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-rose-300 text-rose-700 hover:bg-rose-100/80 dark:border-rose-500 dark:text-rose-300 dark:hover:bg-rose-900/60">
            Clear
          </button>
        </SettingRow>
        <SettingRow
          label="Disconnect All Wallets"
          helper="Remove all connected wallet addresses."
        >
          <button className="rounded-xl border px-3 py-1.5 text-xs sm:text-sm border-rose-300 text-rose-700 hover:bg-rose-100/80 dark:border-rose-500 dark:text-rose-300 dark:hover:bg-rose-900/60">
            Disconnect
          </button>
        </SettingRow>
        <SettingRow
          label="Delete Account"
          helper="Permanently delete your account and all data."
        >
          <button className="rounded-xl px-3 py-1.5 text-xs sm:text-sm bg-rose-600 text-white hover:bg-rose-700">
            Delete
          </button>
        </SettingRow>
      </SettingsSection>
    </section>
  );
}
