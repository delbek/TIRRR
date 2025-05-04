// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.detail || 'Giriş başarısız');
        return;
      }

      // success: save token and redirect
      localStorage.setItem('authToken', data.token);
      const next = searchParams.get('redirect') || '/';
      router.push("/");
    } catch (err) {
      console.error(err);
      alert('Sunucuya bağlanırken hata oluştu.');
    }
  };

  return (
    <div className="px-6 pt-10 pb-6">
      <h1 className="text-4xl font-extrabold text-left mb-8">Hoş Geldiniz!</h1>

      <div className="flex flex-col gap-4">
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">📱</span>
          <input
            type="text"
            placeholder="Telefon Numaranız"
            className="bg-transparent flex-1 outline-none text-base"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Şifreniz"
            className="bg-transparent flex-1 outline-none text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 ml-2"
          >
            👁
          </button>
        </div>

        <div className="text-right">
          <Link href="/forgetpassword" className="text-sm text-[#0B1C39] font-medium">
            Şifrenizi mi Unuttunuz?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg w-full"
        >
          Giriş Yap
        </button>
      </div>

      <div className="my-6 text-center text-sm text-gray-500">- ya da -</div>

      <div className="text-center">
        <Link href="/register" className="text-[#0B1C39] font-semibold underline">
          Hesap Oluştur
        </Link>
      </div>
    </div>
  );
}