'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (res.ok && data.status) {
        localStorage.setItem('token', `Bearer ${data.token}`);
        router.push('/');
      } else {
        setError('Giriş başarısız. Lütfen telefon numaranızı ve şifrenizi kontrol edin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-transparent flex-1 outline-none text-base"
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent flex-1 outline-none text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 ml-2"
          >
            👁
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-right">
          <Link href="/forgetpassword" className="text-sm text-[#0B1C39] font-medium">
            Şifrenizi mi Unuttunuz?
          </Link>
        </div>

        <button
          type="button"
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
