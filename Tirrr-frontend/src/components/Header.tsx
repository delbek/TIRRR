"use client";

import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between h-16 px-2 shadow-sm bg-white">
      {/* Hamburger icon */}
      <button
        onClick={onMenuClick}
        aria-label="Open drawer"
        className="ml-4"
      >
        <Menu className="w-5 h-5 text-black" />
      </button>

      {/* Logo (centered) */}
      <Image
        src="/wait.png"
        alt="TIRRR Logo"
        width={100}
        height={36}
        className="object-contain"
      />

      {/* Spacer to balance layout */}
      <div className="w-5 h-5" />
    </header>
  );
}
