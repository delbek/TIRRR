// app/forgetpassword/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendCode = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgetpassword/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.detail || "Kodu gönderirken bir hata oluştu.");
      } else {
        // assume API returns { detail: "..." } on success
        setSuccessMsg(data.detail || "Şifre sıfırlama kodu gönderildi.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Sunucuya bağlanırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 pt-10 pb-6">
      <h1 className="text-4xl font-extrabold text-left mb-8">
        Şifrenizi Sıfırlayın
      </h1>

      <div className="flex flex-col gap-4">
        {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-600 text-center">{successMsg}</p>
        )}

        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">📱</span>
          <input
            type="text"
            placeholder="Telefon Numaranız"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-transparent flex-1 outline-none text-base"
          />
        </div>

        <button
          type="button"
          onClick={handleSendCode}
          disabled={loading || !phone.trim()}
          className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg w-full disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Kodu Gönder"}
        </button>
      </div>

      <div className="my-6 text-center text-sm text-gray-500">- ya da -</div>

      <div className="text-center">
        <Link href="/login" className="text-[#0B1C39] font-semibold underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
