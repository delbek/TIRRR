"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStartRoute = pathname?.startsWith("/start");

  // Always initialize hooks at top-level
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleMenuClick = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  // If any /start route, render only the children
  if (isStartRoute) {
    return (
      <html lang="en">
        <body className="bg-gray-50 min-h-screen">{children}</body>
      </html>
    );
  }

  // Otherwise render header and drawer
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Header onMenuClick={handleMenuClick} />
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
