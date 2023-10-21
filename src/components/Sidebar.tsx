
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Location from "./Location";
import NewChatButton from "./NewChatButton";
import SidebarContent from "./SidebarContent";


export default function Sidebar() {
  return (
    <aside className="hidden lg:block fixed top-[4rem] left-0 w-[20.375rem] z-50 bottom-0 py-6 sm">
      <SidebarContent />
    </aside>
  );
}

