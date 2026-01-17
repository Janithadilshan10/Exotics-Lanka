import { Outlet } from "react-router-dom";
import { DealerSidebar } from "@/components/dealer/DealerSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Building2 } from "lucide-react";

const DealerLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DealerSidebar />
          <main className="flex-1 overflow-x-hidden">
            <header className="h-16 border-b border-border/30 bg-card/30 backdrop-blur-xl flex items-center px-4 md:px-6 sticky top-0 z-20">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-lg md:text-xl font-semibold">Command Center</h1>
                  <p className="text-xs text-muted-foreground hidden md:block">Dealer Portal</p>
                </div>
              </div>
            </header>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DealerLayout;
