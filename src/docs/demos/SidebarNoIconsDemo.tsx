import { useState } from "react";
import { FaFileMedical, FaUserCircle, FaUsers } from "react-icons/fa";
import Sidebar from "../../componentsUI/Sidebar";
import { SidebarResponsiveWrapper } from "../SidebarResponsiveWrapper";

export function SidebarNoIconsDemo() {
  const [activePath, setActivePath] = useState("/item-1");

  const menuItems = [
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1" },
        { label: "Subitem 2", path: "/item-2/subitem-2" },
        { label: "Subitem 3", path: "/item-2/subitem-3" },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
  ];

  return (
    <SidebarResponsiveWrapper>
      {(isOpen) => (
        <Sidebar
          isOpen={isOpen}
          userName="María López"
          title="Panel de Control"
          activePath={activePath}
          className="absolute top-0 left-0 z-20 w-62 h-full"
          menuItems={menuItems}
          onNavigate={(path) => setActivePath(path)}
        />
      )}
    </SidebarResponsiveWrapper>
  );
}
