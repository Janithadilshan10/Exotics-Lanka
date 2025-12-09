import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Sell from "./pages/Sell";
import DealerLayout from "./pages/dealer/DealerLayout";
import DealerHome from "./pages/dealer/DealerHome";
import Analytics from "./pages/dealer/Analytics";
import Inventory from "./pages/dealer/Inventory";
import Inbox from "./pages/dealer/Inbox";
import Staff from "./pages/dealer/Staff";
import Settings from "./pages/dealer/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/dealer" element={<DealerLayout />}>
            <Route index element={<DealerHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="staff" element={<Staff />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
