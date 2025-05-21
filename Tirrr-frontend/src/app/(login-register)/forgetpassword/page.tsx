'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    setError('');
    try {
      const res = await fetch('/api/forgetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (res.ok && data.status) {
        setMessage('Şifreniz WhatsApp ile gönderilmiştir');
        setShowMessage(true);
      } else {
        setError('Bir hata oluştu. Lütfen telefon numaranızı kontrol edin.');
      }
    } catch (err) {
      console.error('Forget password error:', err);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleClose = () => {
    setShowMessage(false);
    router.push('/login');
  };

  return (
    <div className="px-6 pt-10 pb-6">
      <h1 className="text-4xl font-extrabold text-left mb-8">Şifrenizi Sıfırlayın</h1>

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

        <button
          type="button"
          onClick={handleSend}
          className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg w-full"
        >
          Şifre Sıfırlama Kodu Gönder
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl">
            <p className="mb-4">{message}</p>
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#0B1C39] text-white px-4 py-2 rounded-xl"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      <div className="my-6 text-center text-sm text-gray-500">- ya da -</div>

      <div className="text-center">
        <Link href="/login" className="text-[#0B1C39] font-semibold underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
