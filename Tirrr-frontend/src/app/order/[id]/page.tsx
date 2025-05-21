'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';

interface Order {
  orderNumber: number;
  name: string;
  numberOfOrders: number;
  content: string;
  volume: number;
  weight: number;
  departureStart: string;
  departureEnd: string;
  departurePoint: string;
  arrivalPoint: string;
  priceBase: number;
}

export default function IlanDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/post/${id}`, {
          headers: {
            'Authorization': token || ''
          }
        });
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
        } else {
          setError('İlan yüklenirken bir hata oluştu.');
        }
      } catch (err) {
        console.error('Fetch order error:', err);
        setError('Sunucuya bağlanılamadı.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="px-6 pt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="px-6 pt-10 text-red-500">{error}</div>;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="page">
      <Head>
        <title>İlan #{order.orderNumber} - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="px-6 py-8 bg-gray-50 min-h-screen flex flex-col">
        <h1 className="text-2xl font-semibold text-center mb-6">İlan #{order.orderNumber}</h1>

        <section className="section mb-6">
          <h2 className="text-xl font-semibold mb-2">İlan Sahibi Bilgileri</h2>
          <div className="owner-name text-lg mb-2">{order.name}</div>
          <div className="row flex justify-between mb-1">
            <span>Toplam İlan:</span>
            <span>{order.numberOfOrders} Adet</span>
          </div>
        </section>

        <hr className="my-4 border-gray-300" />

        <section className="section mb-6">
          <h2 className="text-xl font-semibold mb-2">İlan Bilgileri</h2>
          <div className="row flex justify-between mb-1">
            <span>İçerik:</span>
            <span>{order.content}</span>
          </div>
          <div className="row flex justify-between mb-1">
            <span>Hacim:</span>
            <span>{order.volume} ton</span>
          </div>
          <div className="row flex justify-between mb-1">
            <span>Ağırlık:</span>
            <span>{order.weight} m³</span>
          </div>
          <div className="row flex justify-between mb-1">
            <span>Kalkış Tarihi Aralığı:</span>
            <span>{order.departureStart} - {order.departureEnd}</span>
          </div>
          <div className="row flex justify-between mb-1">
            <span>Kalkış Noktası:</span>
            <span>{order.departurePoint}</span>
          </div>
          <div className="row flex justify-between mb-1">
            <span>Varış Noktası:</span>
            <span>{order.arrivalPoint}</span>
          </div>
          <div className="row flex justify-between mb-1">
            <span>Ücret:</span>
            <span>{order.priceBase} + KDV</span>
          </div>
        </section>

        <button
          type="button"
          className="btn mt-auto"
          onClick={() => router.back()}
        >
          Geri Dön
        </button>
      </main>

      <style jsx>{`
        .btn {
          width: 100%;
          padding: 16px;
          background: #1a237e;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
