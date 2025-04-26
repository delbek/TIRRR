"use client";

import React, { useState } from "react";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import "@/app/globals.css";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

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
