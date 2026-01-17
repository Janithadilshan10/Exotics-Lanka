import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Save, User as UserIcon, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { successConfetti } from "@/lib/confetti";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: "",
        bio: "",
        avatar: user.avatar || "",
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      phone: formData.phone,
      avatar: formData.avatar,
    });
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "dealer":
        return <Badge className="bg-primary">Dealer</Badge>;
      case "seller":
        return <Badge variant="outline">Private Seller</Badge>;
      default:
        return <Badge variant="secondary">Buyer</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="My Profile - Account Settings"
        description="Manage your Exotics Lanka profile, update your information, and customize your account settings."
        keywords="user profile, account settings, edit profile"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your account information
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Avatar & Basic Info */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                  {/* Avatar */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative group">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={formData.avatar} alt={formData.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                          {formData.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label
                          htmlFor="avatar-upload"
                          className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Camera className="h-8 w-8 text-white" />
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    <h2 className="font-display text-2xl font-bold mt-4 mb-2 text-center">
                      {formData.name}
                    </h2>

                    <div className="flex gap-2 mb-4">
                      {getRoleBadge(user.role)}
                      {user.verified && (
                        <Badge className="bg-emerald-500">Verified</Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Listings</span>
                      <span className="font-semibold">
                        {JSON.parse(localStorage.getItem("myListings") || "[]").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Favorites</span>
                      <span className="font-semibold">
                        {JSON.parse(localStorage.getItem("favorites") || "[]").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Messages</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Edit Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border p-8">
                  {/* Edit Toggle */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display text-2xl font-semibold">
                      Account Details
                    </h3>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            // Reset form
                            setFormData({
                              name: user.name || "",
                              email: user.email || "",
                              phone: user.phone || "",
                              location: "",
                              bio: "",
                              avatar: user.avatar || "",
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button variant="gold" onClick={handleSave} className="gap-2">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          className="pl-10"
                          disabled
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+94 77 123 4567"
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="Colombo, Sri Lanka"
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    {user.role !== "buyer" && (
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                          placeholder="Tell us about yourself..."
                          rows={4}
                          disabled={!isEditing}
                        />
                        <p className="text-xs text-muted-foreground">
                          This will be displayed on your public seller profile
                        </p>
                      </div>
                    )}

                    {/* Account Type */}
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-sm capitalize font-medium">
                          {user.role}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Contact support to change your account type
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Verification Prompt */}
                  {(user.role === "seller" || user.role === "dealer") && !user.verified && (
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">Get Verified</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Verify your identity to build trust with buyers and get 3x more inquiries
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate("/verification")}
                            >
                              Start Verification
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Danger Zone */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h4 className="font-semibold text-destructive mb-4">
                      Danger Zone
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                        <div>
                          <p className="font-medium text-sm">Delete Account</p>
                          <p className="text-xs text-muted-foreground">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Profile;


