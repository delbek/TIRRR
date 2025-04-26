// app/login/register/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen px-6 pt-10 pb-6 flex flex-col justify-between text-center">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-left mb-8">Hesap Oluşturun</h1>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Phone input */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">📱</span>
          <input
            type="text"
            placeholder="Telefon Numaranız"
            className="bg-transparent flex-1 outline-none text-base"
          />
        </div>

        {/* Password input */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border">
          <span className="mr-2 text-gray-500">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Şifreniz"
            className="bg-transparent flex-1 outline-none text-base"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
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
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-500 ml-2"
          >
            👁
          </button>
        </div>

        {/* Privacy Policy */}
        <p className="text-sm text-left text-gray-600 leading-snug">
          Gizlilik Sözleşmemizi okumak için{' '}
          <Link href="/privacy-policy" className="text-[#0B1C39] underline">
            buraya
          </Link>{' '}
          tıklayabilirsiniz.
        </p>

        {/* Register Button (navigates to /signin) */}
        <Link href="/signin">
          <button className="bg-[#0B1C39] text-white py-3 rounded-xl font-semibold text-lg mt-2 w-full">
            Hesap Oluştur
          </button>
        </Link>
      </div>

      {/* OR separator */}
      <div className="my-6 text-sm text-gray-500">- ya da -</div>

      {/* Social Login Buttons */}
      <div className="flex justify-center gap-6">
        {[
          { src: '/images/log-in/Google.png', alt: 'Google', adjust: 'scale-[1.6]' },
          { src: '/images/log-in/Apple.png', alt: 'Apple', adjust: 'scale-[1.5]' },
          { src: '/images/log-in/Facebook.png', alt: 'Facebook', adjust: 'scale-[1.5]' },
        ].map((provider) => (
          <button
            key={provider.alt}
            className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <div className={`relative w-10 h-10 ${provider.adjust}`}>
              <Image
                src={provider.src}
                alt={provider.alt}
                fill
                className="object-contain"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Login Redirect */}
      <div className="mt-6">
        <Link href="/login" className="text-[#0B1C39] font-semibold underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}