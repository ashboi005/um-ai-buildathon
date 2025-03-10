"use client";
import { ReactNode, useState } from "react";
import StudentSidebar from "@/components/sidebar_student";
import { Footer } from "@/components/ui/footer-section";
import { Menu } from "lucide-react";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar with responsive width */}
      <aside
        className={`transition-all duration-300 ease-in-out border-r bg-muted/20 dark:bg-muted/10 
        ${isSidebarOpen ? "w-64" : "w-16"} flex-shrink-0 min-h-screen`}
      >
        <StudentSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Optional Top bar (for smaller devices or toggle) */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button
            className="p-2"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
