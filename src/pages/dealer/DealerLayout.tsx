import { Outlet } from "react-router-dom";
import { DealerSidebar } from "@/components/dealer/DealerSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DealerLayout = () => {
  return (
    <div className="dark min-h-screen bg-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DealerSidebar />
          <main className="flex-1 overflow-x-hidden">
            <header className="h-16 border-b border-border flex items-center px-4 md:px-6">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-display text-lg md:text-xl font-semibold">Command Center</h1>
            </header>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DealerLayout;
