// app/post/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { useState, useEffect } from 'react';

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
      // No token → send to login, preserving this page
      router.replace(`/login?redirect=/post/${id}`);
      return;
    }

    if (!id) return;

    setLoading(true);
    fetch(`/api/post/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (res.status === 401) {
          // Unauthorized → redirect to login
          router.replace(`/login?redirect=/post/${id}`);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Ilan>;
      })
      .then((data) => {
        if (data) setIlan(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Veri yüklenirken hata oluştu.');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="page">
        <p>Yükleniyor…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="page">
        <p className="error">{error}</p>
      </div>
    );
  }
  if (!ilan) {
    return (
      <div className="page">
        <p className="error">İlan bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <Head>
        <title>İlan #{ilan.id} - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>İlan #{ilan.id}</h1>

        <section className="section">
          <h2>İlan Sahibi Bilgileri</h2>
          <div className="owner-name">{ilan.owner}</div>
          <div className="row">
            <span>İşlem Geçmişi</span>
            <span>{ilan.historyCount} Adet</span>
          </div>
        </section>

        <hr />

        <section className="section">
          <h2>İlan Bilgileri</h2>
          <div className="row">
            <span>İçerik</span>
            <span>{ilan.content}</span>
          </div>
          <div className="row">
            <span>Hacim</span>
            <span>{ilan.volume}</span>
          </div>
          <div className="row">
            <span>Kilo</span>
            <span>{ilan.weight}</span>
          </div>
          <div className="row">
            <span>Kalkış Tarihi Aralığı</span>
            <span>
              {ilan.startDate} - {ilan.endDate}
            </span>
          </div>
          <div className="row">
            <span>Kalkış Noktası</span>
            <span>{ilan.from}</span>
          </div>
          <div className="row">
            <span>Varış Noktası</span>
            <span>{ilan.to}</span>
          </div>
          <div className="row">
            <span>Ücret</span>
            <span>{ilan.price}</span>
          </div>
        </section>

        <button className="btn">Mesaj At</button>
      </main>

      <style jsx>{`
        .page {
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          background: #f8f8f8;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          text-align: center;
        }
        .section {
          margin-bottom: 24px;
        }
        h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .owner-name {
          font-size: 18px;
          margin-bottom: 12px;
        }
        .row {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          margin-bottom: 8px;
        }
        hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 0 0 24px;
        }
        .btn {
          width: 100%;
          padding: 16px;
          background: #1a237e;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: auto;
        }
        .error {
          text-align: center;
          color: #b00020;
        }
      `}</style>
    </div>
  );
}