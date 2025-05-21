'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (res.ok && data.status) {
        router.push('/login');
      } else {
        setError('Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className="px-6 pt-10 pb-6">
      <h1 className="text-4xl font-extrabold text-left mb-8">
        Hesap Oluşturun
      </h1>

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
          >👁</button>
        </div>

        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">🔒</span>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Şifreniz (tekrar)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-transparent flex-1 outline-none text-base"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-500 ml-2"
          >👁</button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-sm text-left text-gray-600 leading-snug">
          Gizlilik Sözleşmemizi okumak için{' '}
          <Link href="/privacy-policy" className="text-[#0B1C39] underline">
            buraya
          </Link>{' '}
          tıklayabilirsiniz.
        </p>

        <button
          type="button"
          onClick={handleRegister}
          className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg w-full"
        >Hesap Oluştur</button>
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
