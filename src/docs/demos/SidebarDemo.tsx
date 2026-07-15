import { useState } from "react";
import { FaFileMedical, FaHospital, FaUserCircle, FaUsers } from "react-icons/fa";
import Sidebar from "../../componentsUI/Sidebar";
import { SidebarResponsiveWrapper } from "../SidebarResponsiveWrapper";

export function SidebarDemo() {
  const [activePath, setActivePath] = useState("/item-1");

  const menuItems = [
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1", icon: FaUserCircle },
        { label: "Subitem 2", path: "/item-2/subitem-2", icon: FaFileMedical },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
    { label: "Item 4", path: "/item-4", icon: FaHospital },
  ];

  return (
    <SidebarResponsiveWrapper>
      {(isOpen) => (
        <Sidebar
          isOpen={isOpen}
          userName="Juan Pérez"
          title="Gestión del Beneficiario"
          activePath={activePath}
          className="absolute top-0 left-0 z-20 w-62 h-full"
          menuItems={menuItems}
          onNavigate={(path) => setActivePath(path)}
        />
      )}
    </SidebarResponsiveWrapper>
  );
}