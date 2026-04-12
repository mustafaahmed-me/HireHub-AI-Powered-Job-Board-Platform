"use client";

import { useState } from "react";
import SideNav from "@/components/ui/SideNav";


type LayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: LayoutProps) {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="flex min-h-screen bg-gray-50">

      <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-4 md:p-6">

        {children}

      </main>

    </div>

  );

}

export default DashboardLayout;
