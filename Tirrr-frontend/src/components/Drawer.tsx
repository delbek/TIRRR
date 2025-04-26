"use client";

import React from "react";
import Link from "next/link";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const menuItems = [
    { label: "Anasayfa", href: "/" },
    { label: "İlan Ara", href: "/ilan-ara" },
    { label: "İlan Ver", href: "/ilan-ver" },
    { label: "Mesajlar", href: "/mesajlar" },
    { label: "Bildirimler", href: "/bildirimler" },
    { label: "Profil", href: "/profil" },
    { label: "Ayarlar", href: "/ayarlar" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-lg font-semibold hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}