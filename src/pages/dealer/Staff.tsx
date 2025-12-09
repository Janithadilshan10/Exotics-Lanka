import { Users, Plus, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockStaff = [
  {
    id: 1,
    name: "Ashan Rathnayake",
    role: "Admin",
    email: "ashan@exotics.lk",
    status: "active",
    avatar: null,
  },
  {
    id: 2,
    name: "Nipun Jayasinghe",
    role: "Sales Manager",
    email: "nipun@exotics.lk",
    status: "active",
    avatar: null,
  },
  {
    id: 3,
    name: "Chamara Dias",
    role: "Sales Rep",
    email: "chamara@exotics.lk",
    status: "active",
    avatar: null,
  },
];

const Staff = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold">Staff Management</h2>
          <p className="text-sm text-muted-foreground">Manage your team members</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStaff.map((member) => (
          <div key={member.id} className="glass-dark rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{member.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{member.role}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">{member.email}</span>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        ))}

        {/* Add Staff Card */}
        <div className="glass-dark rounded-2xl p-6 border-2 border-dashed border-muted flex items-center justify-center cursor-pointer hover:bg-muted/10 transition-colors">
          <div className="text-center">
            <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Add New Staff Member</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
