"use client";

import Head from 'next/head';
import Image from 'next/image';

const dummyResults = [
  { id: 1, from: 'Nereden', to: 'Nereye', price: '16000+KDV', date: '15 Mart' },
  { id: 2, from: 'Nereden', to: 'Nereye', price: '16000+KDV', date: '15 Mart' },
  { id: 3, from: 'Nereden', to: 'Nereye', price: '16000+KDV', date: '15 Mart' },
  { id: 4, from: 'Nereden', to: 'Nereye', price: '16000+KDV', date: '15 Mart' },
  { id: 5, from: 'Nereden', to: 'Nereye', price: '16000+KDV', date: '15 Mart' },
  { id: 6, from: 'Nereden', to: 'Nereye', price: '16000+KDV', date: '15 Mart' },
];

export default function IlanAraResults() {
  return (
    <div className="page">
      <Head>
        <title>İlan Ara - Sonuçlar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>İlan Ara</h1>
        <div className="results">
          {dummyResults.map(({ id, from, to, price, date }) => (
            <div key={id} className="card">
              <div className="info">
                <div className="route">
                  <strong>{from}&rarr;{to}</strong>
                </div>
                <div className="price">{price}</div>
              </div>
              <div className="date">{date}</div>
            </div>
          ))}
        </div>
        <button className="filter-btn">Filtrele</button>
      </main>
      <style jsx>{`
        .page {
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
          margin-bottom: 16px;
        }
        .results {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border: 2px solid #000;
          border-radius: 16px;
          background: #fff;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .route {
          font-size: 18px;
        }
        .price {
          font-size: 16px;
        }
        .date {
          font-size: 16px;
          white-space: nowrap;
        }
        .filter-btn {
          padding: 16px;
          background: #1a237e;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
        }
      `}</style>
    </div>
  );
}