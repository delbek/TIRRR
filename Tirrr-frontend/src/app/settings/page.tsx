"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MoonIcon,
  BellIcon,
  LockClosedIcon,
  InformationCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${
        on ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
          on ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [matches, setMatches] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Ayarlar</h1>

      {/* profile */}
      <div className="mt-6 flex items-center space-x-4 px-4">
        {/* put adina-avatar.jpg into /public */}
        <Image
          src="/adina-avatar.jpg"
          alt="Adina Nurrahma"
          width={56}
          height={56}
          className="rounded-full"
        />
        <span className="text-lg font-medium">Adina Nurrahma</span>
      </div>

      {/* the card */}
      <div className="mt-8 bg-white rounded-lg overflow-hidden divide-y divide-gray-200">
        {/* Dark Mode */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <MoonIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Karanlık Mod</span>
          </div>
          <Toggle on={darkMode} onClick={() => setDarkMode(!darkMode)} />
        </div>

        {/* Matches */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Eşleşmeler</span>
          </div>
          <Toggle on={matches} onClick={() => setMatches(!matches)} />
        </div>

        {/* Reset password */}
        <Link
          href="/reset-password"
          className="flex items-center justify-between px-4 py-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <LockClosedIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Şifreni Sıfırla</span>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </Link>

        {/* Contact us */}
        <Link
          href="/contact"
          className="flex items-center justify-between px-4 py-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <InformationCircleIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Bize Ulaş</span>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </Link>
      </div>
    </div>
  );
}
