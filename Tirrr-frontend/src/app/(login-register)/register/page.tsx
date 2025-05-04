'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Şifreler eşleşmiyor.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.detail || 'Kayıt başarısız.');
        return;
      }

      // go to the login page after successful registration
      router.push('/login');
    } catch {
      setErrorMsg('Sunucuya bağlanırken hata oluştu.');
    }
  };

  return (
    <div className="px-6 pt-10 pb-6">
      <h1 className="text-4xl font-extrabold text-left mb-8">
        Hesap Oluşturun
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorMsg && (
          <p className="text-red-600 text-center">{errorMsg}</p>
        )}

        {/* Phone input */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">📱</span>
          <input
            type="text"
            placeholder="Telefon Numaranız"
            className="bg-transparent flex-1 outline-none text-base"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Şifreniz"
            className="bg-transparent flex-1 outline-none text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-gray-500 ml-2"
          >
            👁
          </button>
        </div>

        {/* Confirm password */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">🔒</span>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Şifreniz (tekrar)"
            className="bg-transparent flex-1 outline-none text-base"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="text-gray-500 ml-2"
          >
            👁
          </button>
        </div>

        <p className="text-sm text-left text-gray-600 leading-snug">
          Gizlilik Sözleşmemizi okumak için{' '}
          <a href="/privacy-policy" className="text-[#0B1C39] underline">
            buraya
          </a>{' '}
          tıklayabilirsiniz.
        </p>

        <button
          type="submit"
          className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg w-full"
        >
          Hesap Oluştur
        </button>
      </form>

      <div className="my-6 text-center text-sm text-gray-500">- ya da -</div>

      <div className="text-center">
        <a href="/login" className="text-[#0B1C39] font-semibold underline">
          Giriş Yap
        </a>
      </div>
    </div>
  );
}