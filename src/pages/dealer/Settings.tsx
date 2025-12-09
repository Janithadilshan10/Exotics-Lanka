import { Settings as SettingsIcon, Building, Bell, CreditCard, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your dealership preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Profile */}
        <div className="glass-dark rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Business Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Dealership Name</label>
              <Input defaultValue="Exotics.lk Premium Motors" className="bg-muted/20 border-border" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Contact Email</label>
              <Input defaultValue="contact@exotics.lk" className="bg-muted/20 border-border" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
              <Input defaultValue="+94 77 123 4567" className="bg-muted/20 border-border" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-dark rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New Lead Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified for new inquiries</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Price Alerts</p>
                <p className="text-xs text-muted-foreground">Market price change notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Weekly Reports</p>
                <p className="text-xs text-muted-foreground">Performance summary emails</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="glass-dark rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Billing & Subscription</h3>
          </div>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="font-semibold text-primary">Premium Plan</p>
            <p className="text-sm text-muted-foreground">Unlimited listings, Advanced analytics</p>
          </div>
          <Button variant="outline" className="w-full">Manage Subscription</Button>
        </div>

        {/* Security */}
        <div className="glass-dark rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Security</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Shield className="h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <SettingsIcon className="h-4 w-4" />
              Two-Factor Authentication
            </Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="px-8">Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
