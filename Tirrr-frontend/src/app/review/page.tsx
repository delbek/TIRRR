"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { StarIcon as StarOutline } from '@heroicons/react/outline';
import { StarIcon as StarSolid } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';

const RatePage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (loading) return;
    if (rating < 1) {
      setError('Lütfen en az 1 yıldız seçin.');
      setSuccess('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.replace('/login?redirect=/rate');
        return;
      }

      const res = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ star: rating, content: comment }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      setSuccess('Yorum başarıyla gönderildi!');
      setComment('');
      setRating(0);
    } catch (err) {
      console.error(err);
      setError('Yorum gönderilirken bir hata oluştu.');
      setSuccess('');
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
          {/* Avatar */}
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-black mb-6">
            <Image
              src="/adina-avatar.jpg"
              alt="Adina"
              width={144}
              height={144}
            />
          </div>

          <h1 className="text-3xl font-semibold text-indigo-900 mb-6">
            Adina’yı Puanla
          </h1>

          {/* Star Rating */}
          <div className="flex mb-6">
            {[...Array(5)].map((_, i) => {
              const value = i + 1;
              const filled = value <= (hover || rating);
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`${value} yıldız`}
                  className="mx-1 focus:outline-none"
                  onClick={() => {
                    setRating(value);
                    if (error) setError('');
                  }}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  disabled={loading}
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

          {/* Comment box */}
          <label
            htmlFor="comment"
            className="self-start mb-2 font-medium text-black text-lg"
          >
            Görüşlerini Yaz
          </label>
          <textarea
            id="comment"
            className="w-full h-48 bg-gray-50 border border-black rounded-lg px-4 py-3 mb-4 placeholder-gray-400 focus:outline-none"
            placeholder="Yorumunuzu buraya yazın..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError('');
            }}
            disabled={loading}
          />

          {/* Success/Error messages */}
          {error && <p className="text-red-600 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg py-4 text-xl font-medium focus:outline-none hover:bg-blue-800"
          >
            {loading ? 'Gönderiliyor…' : 'Gönder'}
          </button>
        </div>
      </main>
    </>
  );
};

export default RatePage;
