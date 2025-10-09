import Card from "../../components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="text-white mb-3">Appearance</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300 text-sm">Theme</div>
              <div className="text-gray-500 text-xs">Dark</div>
            </div>
            <select className="bg-transparent border border-border rounded-xl px-3 py-2">
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300 text-sm">Language</div>
              <div className="text-gray-500 text-xs">English</div>
            </div>
            <select className="bg-transparent border border-border rounded-xl px-3 py-2">
              <option>English</option>
              <option>Persian</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300 text-sm">Display Currency</div>
              <div className="text-gray-500 text-xs">USD ($)</div>
            </div>
            <select className="bg-transparent border border-border rounded-xl px-3 py-2">
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-white mb-3">Notifications</div>
        <div className="space-y-3">
          {[
            "Email Notifications",
            "Push Notifications",
            "Transaction Alerts",
            "Price Alerts",
            "Staking Rewards",
          ].map((l) => (
            <div key={l} className="flex items-center justify-between">
              <div className="text-gray-300">{l}</div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-10 h-6 bg-white/10 rounded-full peer-checked:bg-emerald-600 relative after:content-[''] after:absolute after:h-5 after:w-5 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 peer-checked:after:translate-x-4 transition"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
