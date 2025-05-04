"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BellIcon,
  LockClosedIcon,
  InformationCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

function Toggle({
  on,
  onClick,
  disabled,
}: {
  on: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        on ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [matches, setMatches] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial setting on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    setLoading(true);
    fetch("/api/match", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        setMatches(!!data.matches);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load notification setting.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleMatchesToggle = async () => {
    const next = !matches;
    setMatches(next);
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Not authenticated.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ matches: next }),
      });
      if (!res.ok) throw new Error("Server error");
    } catch (err) {
      console.error(err);
      setError("Failed to update setting.");
      // revert UI state
      setMatches((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Ayarlar</h1>

      {/* profile */}
      <div className="mt-6 flex items-center space-x-4 px-4">
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
        {/* Matches */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Eşleşmeler</span>
          </div>
          <Toggle on={matches} onClick={handleMatchesToggle} disabled={loading} />
        </div>
        {error && (
          <p className="px-4 py-2 text-sm text-red-500">{error}</p>
        )}

        {/* Reset password */}
        <Link
          href="/forgetpassword"
          className="flex items-center justify-between px-4 py-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <LockClosedIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Şifreni Sıfırla</span>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </Link>

        {/* Contact us */}
        <a
          href="tel:+905316882362"
          className="flex items-center justify-between px-4 py-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <InformationCircleIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800">Bize Ulaş</span>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </a>
      </div>
    </div>
  );
}