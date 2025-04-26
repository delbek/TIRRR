// app/forgetpassword/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen px-6 pt-10 pb-6 flex flex-col justify-between text-center">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-left mb-8">Şifrenizi Sıfırlayın</h1>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Phone input */}
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

        {/* Send Reset Code Button */}
        <button className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg">
          Şifre Sıfırlama Kodu Gönder
        </button>
      </div>

      {/* Back to Login */}
      <div className="mt-6">
        <Link href="/login" className="text-[#0B1C39] font-semibold underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}