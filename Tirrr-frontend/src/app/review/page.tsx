"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { StarIcon as StarOutline } from '@heroicons/react/outline';
import { StarIcon as StarSolid } from '@heroicons/react/solid';

const RatePage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

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

          <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Adina’yı Puanla</h1>

          {/* Star Rating */}
          <div className="flex mb-6">
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

          {/* Comment box */}
          <label className="self-start mb-2 font-medium text-black text-lg">Görüşlerini Yaz</label>
          <textarea
            className="w-full h-48 bg-gray-50 border border-black rounded-lg px-4 py-3 mb-8 placeholder-gray-400 focus:outline-none"
            placeholder="Yorumunuzu buraya yazın..."
          />

          <button className="w-full bg-blue-900 text-white rounded-lg py-4 text-xl font-medium focus:outline-none hover:bg-blue-800">
            Gönder
          </button>
        </div>
      </main>
    </>
  );
};

export default RatePage;
