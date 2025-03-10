"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, FileText, ChevronLeft, ChevronRight } from "lucide-react";

const StudentSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Past Tests",
      href: "/past-tests",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <div className="relative h-full flex flex-col">
      {/* Sidebar content */}
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <SidebarLink key={index} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Collapse/Expand button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute bottom-4 right-2 bg-muted rounded-full p-1 hover:bg-muted/50 transition"
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default StudentSidebar;
