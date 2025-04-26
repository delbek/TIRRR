"use client";

import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

export default function IlanDetail() {
  const { id } = useParams();

  // Dummy data — replace with real API data later
  const ilan = {
    owner: "Mustafa Hasan",
    historyCount: 0,
    content: "Mobilya",
    volume: "12 bin m³",
    weight: "20 ton",
    date: "24.04.25",
    from: "Konya",
    to: "İstanbul",
    price: "15000 + KDV",
  };

  return (
    <div className="page">
      <Head>
        <title>İlan #{id} - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>İlan #{id}</h1>

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
            <span>Tarih</span>
            <span>{ilan.date}</span>
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

        <button className="message-btn">Mesaj At</button>
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
        .message-btn {
          margin-top: auto;
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
