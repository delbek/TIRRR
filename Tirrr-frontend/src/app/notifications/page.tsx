// File: app/post/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';

interface Ilan {
  id: string;
  owner: string;
  historyCount: number;
  content: string;
  volume: string;
  weight: string;
  startDate: string;
  endDate: string;
  from: string;
  to: string;
  price: string;
}

export default function IlanDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // No token → redirect to login preserving this page
      router.replace(`/login?redirect=/post/${id}`);
      return;
    }

    if (!id) return;

    setLoading(true);
    fetch(`/api/post/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            router.replace(`/login?redirect=/post/${id}`);
            return;
          }
          const data = await res.json().catch(() => null);
          throw new Error(data?.detail || `Hata ${res.status}`);
        }
        return res.json();
      })
      .then((data: Ilan) => {
        setIlan(data);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err.message || 'Veri yüklenirken hata oluştu');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-semibold text-indigo-900 mb-6">İlan Detayı</h1>
        <p>Yükleniyor…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-semibold text-indigo-900 mb-6">İlan Detayı</h1>
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!ilan) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-semibold text-indigo-900 mb-6">İlan Bulunamadı</h1>
      </main>
    );
  }

  return (
    <>  
      <Head>
        <title>İlan #{ilan.id}</title>
      </Head>
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-semibold text-indigo-900 mb-4">İlan Detayı</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p><strong>Sahip:</strong> {ilan.owner}</p>
          <p><strong>Geçmiş İlan Sayısı:</strong> {ilan.historyCount}</p>
          <p><strong>İçerik:</strong> {ilan.content}</p>
          <p><strong>Hacim:</strong> {ilan.volume}</p>
          <p><strong>Ağırlık:</strong> {ilan.weight}</p>
          <p><strong>Başlangıç Tarihi:</strong> {new Date(ilan.startDate).toLocaleDateString()}</p>
          <p><strong>Bitiş Tarihi:</strong> {new Date(ilan.endDate).toLocaleDateString()}</p>
          <p><strong>Gönderim Yeri:</strong> {ilan.from}</p>
          <p><strong>Varış Yeri:</strong> {ilan.to}</p>
          <p><strong>Fiyat:</strong> {ilan.price}</p>
        </div>
      </main>
    </>
  );
}
