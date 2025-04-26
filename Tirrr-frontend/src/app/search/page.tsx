"use client";

import Head from 'next/head';
import Image from 'next/image';

export default function IlanAra() {
  return (
    <div className="page">
      <Head>
        <title>İlan Ara - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>İlan Ara</h1>
        <form className="form">
          <label>
            Kalkış Noktası
            <input type="text" placeholder="Bir konum belirleyin" />
          </label>
          <label>
            Ücret Aralığı
            <input type="text" placeholder="Bir fiyat aralığı seçin" />
          </label>
          <label>
            Başlangıç Tarihi
            <input type="date" placeholder="Bir tarih seçin" />
          </label>
          <label>
            Bitiş Tarihi
            <input type="date" placeholder="Bir tarih seçin" />
          </label>
          <label>
            Maksimum Yük Ağırlığı
            <input type="number" placeholder="Bir ton seçin" />
          </label>
          <button type="submit" className="submit-btn">Ara</button>
        </form>
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
        }
        h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        label {
          display: flex;
          flex-direction: column;
          font-size: 16px;
        }
        input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          margin-top: 8px;
        }
        .submit-btn {
          margin-top: 24px;
          padding: 16px;
          background: #1a237e;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          width: 100%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
