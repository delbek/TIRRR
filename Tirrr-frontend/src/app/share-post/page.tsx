'use client';

import { useState, FormEvent } from 'react';
import Head from 'next/head';

export default function PublishPage() {
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [content, setContent] = useState('');
  const [departureDateStart, setDepartureDateStart] = useState('');
  const [departureDateEnd, setDepartureDateEnd] = useState('');
  const [priceExclVat, setPriceExclVat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          departureLocation,
          arrivalLocation,
          weight,
          volume,
          content,
          departureDateStart,
          departureDateEnd,
          priceExclVat
        })
      });
      const data = await res.json();
      if (res.ok && data.status) {
        setShowSuccess(true);
      } else {
        setError('İlan yayınlanamadı. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      console.error('Publish error:', err);
      setError('Sunucuya bağlanılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>İlan Ver - TIRRR</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-6">İlan Ver</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              Kalkış Noktası
              <input
                type="text"
                placeholder="Bir konum belirleyin"
                value={departureLocation}
                onChange={e => setDepartureLocation(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block">
              Varış Noktası
              <input
                type="text"
                placeholder="Bir konum belirleyin"
                value={arrivalLocation}
                onChange={e => setArrivalLocation(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block">
              Ağırlık (ton)
              <input
                type="text"
                placeholder="Örn: 5"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block">
              Hacim (m³)
              <input
                type="text"
                placeholder="Örn: 15"
                value={volume}
                onChange={e => setVolume(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block">
              İçerik
              <input
                type="text"
                placeholder="Fragile electronics"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <div className="flex space-x-4">
              <label className="flex-1">
                Kalkış Tarih Başlangıç
                <input
                  type="date"
                  value={departureDateStart}
                  onChange={e => setDepartureDateStart(e.target.value)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </label>
              <label className="flex-1">
                Kalkış Tarih Bitiş
                <input
                  type="date"
                  value={departureDateEnd}
                  onChange={e => setDepartureDateEnd(e.target.value)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </label>
            </div>
            <label className="block">
              Ücret (KDV Hariç)
              <input
                type="text"
                placeholder="Örn: 1500"
                value={priceExclVat}
                onChange={e => setPriceExclVat(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg disabled:opacity-50"
            >
              {loading ? 'Yayımlanıyor...' : 'Yayınla'}
            </button>
          </form>
        </div>
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <p className="mb-4">İlanınız paylaşıldı</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg"
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
