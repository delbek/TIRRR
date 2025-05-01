"use client";

import { useState } from "react";
import Head from "next/head";

export default function OrdersPage() {
  const [tab, setTab] = useState<"active" | "pending" | "past">("active");

  const orders = {
    active: [
      { route: "Konya→İstanbul", price: "16000+KDV", date: "15 Mart" },
      { route: "Ankara→Bursa", price: "12000+KDV", date: "12 Mart" },
      { route: "İzmir→Adana", price: "14000+KDV", date: "10 Mart" },
    ],
    pending: [
      { route: "Antalya→Muğla", price: "10000+KDV", date: "18 Mart" },
      { route: "Eskişehir→Konya", price: "9000+KDV", date: "17 Mart" },
    ],
    past: [
      { route: "Trabzon→Rize", price: "8000+KDV", date: "5 Mart" },
      { route: "Gaziantep→Şanlıurfa", price: "7000+KDV", date: "1 Mart" },
    ],
  };

  return (
    <div className="container">
      <Head>
        <title>Rotalarım - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="tabs">
          <button
            className={tab === "active" ? "tab active" : "tab"}
            onClick={() => setTab("active")}
          >
            Aktif
          </button>
          <button
            className={tab === "pending" ? "tab active" : "tab"}
            onClick={() => setTab("pending")}
          >
            Bekleyen
          </button>
          <button
            className={tab === "past" ? "tab active" : "tab"}
            onClick={() => setTab("past")}
          >
            Geçmiş
          </button>
        </div>

        <div className="orders">
          {orders[tab].map((o, idx) => (
            <div key={idx} className="order-item">
              <div className="order-row">
                <div className="route">{o.route}</div>
                <div className="date">{o.date}</div>
              </div>
              <div className="price">{o.price}</div>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          background: #f8f8f8;
          min-height: 100vh;
        }
        main {
          display: flex;
          flex-direction: column;
        }
        .tabs {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
        }
        .tab {
          font-size: 20px;
          font-weight: 500;
          background: none;
          border: none;
          padding: 4px 0;
          cursor: pointer;
          color: #333;
        }
        .tab.active {
          border-bottom: 3px solid #1a237e;
          color: #1a237e;
        }
        .orders {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .order-item {
          background: white;
          border: 2px solid #000;
          border-radius: 12px;
          padding: 12px;
        }
        .order-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .route {
          font-size: 18px;
          font-weight: 600;
        }
        .date {
          font-size: 16px;
          color: #333;
        }
        .price {
          font-size: 18px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
