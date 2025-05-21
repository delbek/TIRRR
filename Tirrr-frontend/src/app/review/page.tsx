'use client';

import { useState, FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { StarIcon as StarOutline } from '@heroicons/react/outline';
import { StarIcon as StarSolid } from '@heroicons/react/solid';

export default function RatePage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError('Lütfen bir puan seçin.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ stars: rating, content }),
      });
      const data = await res.json();
      if (res.ok && data.status) {
        setShowSuccess(true);
      } else {
        setError('Yorum gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      console.error('Review error:', err);
      setError('Sunucuya bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Adina’yı Puanla</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-black mb-6">
            <Image
              src="/adina-avatar.jpg"
              alt="Adina"
              width={144}
              height={144}
            />
          </div>

          <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Adina’yı Puanla</h1>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => {
                const value = i + 1;
                const filled = value <= (hover || rating);
                return (
                  <button
                    key={i}
                    type="button"
                    className="mx-1 focus:outline-none"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(0)}
                  >
                    {filled ? (
                      <StarSolid className="h-8 w-8 text-black" />
                    ) : (
                      <StarOutline className="h-8 w-8 stroke-current text-black" />
                    )}
                  </button>
                );
              })}
            </div>

            <label className="block self-start mb-2 font-medium text-black text-lg">Görüşlerinizi Yaz</label>
            <textarea
              className="w-full h-48 bg-gray-50 border border-black rounded-lg px-4 py-3 mb-4 placeholder-gray-400 focus:outline-none"
              placeholder="Yorumunuzu buraya yazın..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white rounded-lg py-4 text-xl font-medium focus:outline-none hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl">
              <p className="mb-4">Yorumunuz kaydedildi</p>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
