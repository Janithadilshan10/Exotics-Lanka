import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import { MessagingProvider } from "./contexts/MessagingContext";
import { ReviewProvider } from "./contexts/ReviewContext";
import { SavedSearchProvider } from "./contexts/SavedSearchContext";
import { ComparisonBar } from "./components/comparison/ComparisonBar";
import { SkipToContent } from "./components/SkipToContent";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import CarDetail from "./pages/CarDetail";
import Compare from "./pages/Compare";
import Sell from "./pages/Sell";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListing";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import SavedSearches from "./pages/SavedSearches";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HowItWorks from "./pages/HowItWorks";
import DealerLayout from "./pages/dealer/DealerLayout";
import DealerHome from "./pages/dealer/DealerHome";
import Analytics from "./pages/dealer/Analytics";
import Inventory from "./pages/dealer/Inventory";
import DealerInbox from "./pages/dealer/Inbox";
import Staff from "./pages/dealer/Staff";
import Settings from "./pages/dealer/Settings";
import NotFound from "./pages/NotFound";
import Verification from "./pages/Verification";
import VerificationQueue from "./pages/admin/VerificationQueue";
import ResolutionCenter from "./pages/ResolutionCenter";

import DealerApplication from "./pages/dealer/DealerApplication";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SavedSearchProvider>
              <ReviewProvider>
                <MessagingProvider>
                  <ComparisonProvider>
                    <SkipToContent />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/collection" element={<Collection />} />
                      <Route path="/car/:id" element={<CarDetail />} />
                      <Route path="/compare" element={<Compare />} />
                      <Route path="/sell" element={<Sell />} />


                      {/* Auth Routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dealer/apply" element={<DealerApplication />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* User Routes (Protected) */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/listing/create" element={<CreateListing />} />
                      <Route path="/listing/edit/:id" element={<CreateListing />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/inbox" element={<Inbox />} />
                      <Route path="/saved-searches" element={<SavedSearches />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/verification" element={<Verification />} />
                      <Route path="/resolution-center" element={<ResolutionCenter />} />

                      {/* Admin Routes */}
                      <Route path="/admin/verifications" element={<VerificationQueue />} />

                      {/* Dealer Portal */}
                      <Route path="/dealer" element={<DealerLayout />}>
                        <Route index element={<DealerHome />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="inbox" element={<DealerInbox />} />
                        <Route path="staff" element={<Staff />} />
                        <Route path="settings" element={<Settings />} />
                      </Route>

                      {/* Static Pages */}
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ComparisonBar />
                  </ComparisonProvider>
                </MessagingProvider>
              </ReviewProvider>
            </SavedSearchProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
