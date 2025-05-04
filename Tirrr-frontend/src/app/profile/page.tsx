"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Profile() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    // Retrieve your auth token however you normally do
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Profiliniz başarıyla güncellendi.");
      } else {
        const error = await res.json();
        console.error("Güncelleme hatası:", error);
        alert("Profil güncellenirken bir hata oluştu.");
      }
    } catch (err) {
      console.error("Fetch hatası:", err);
      alert("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <div className="page">
      <Head>
        <title>Profil - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="profile-header">
          <Image
            src="/profile-avatar.png"
            alt="Profil Resmi"
            width={80}
            height={80}
            className="avatar-img"
          />
          <h1>Profil</h1>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <section>
            <h2>Hesap Bilgileriniz</h2>
            <label>
              Telefon Numaranız
              <input name="phone" type="text" defaultValue="05316882362" />
            </label>
            <label>
              Şifreniz
              <input
                name="password"
                type="password"
                defaultValue=""
                placeholder="Yeni şifre girin"
              />
            </label>
            <a href="#" className="change-pass">
              Şifreyi Değiştir
            </a>
          </section>

          <hr />

          <section>
            <h2>İş Bilgileriniz</h2>
            <label>
              Plakanız
              <input name="plate" type="text" defaultValue="42TC432" />
            </label>
            <label>
              Vergi Numaranız
              <input
                name="taxNumber"
                type="text"
                defaultValue="4534895739842"
              />
            </label>
            <label>
              Adresiniz
              <input
                name="address"
                type="text"
                defaultValue="Levent/İstanbul"
              />
            </label>
            <label>
              İl
              <input name="city" type="text" placeholder="İl girin" />
            </label>
            <label>
              İlçe
              <input name="district" type="text" placeholder="İlçe girin" />
            </label>
          </section>

          <hr />

          <section>
            <h2>Kişisel Bilgileriniz</h2>
            <label>
              İsminiz
              <input name="firstName" type="text" defaultValue="Sude" />
            </label>
            <label>
              Soyisminiz
              <input name="lastName" type="text" defaultValue="Sır" />
            </label>
            <label>
              Doğum Tarihiniz
              <input name="birthDate" type="date" defaultValue="2005-10-23" />
            </label>
          </section>

          <hr />

          <section>
            <h2>Araç Bilgileriniz</h2>
            <label>
              Araç Tipi
              <select
                name="vehicleType"
                defaultValue="Panelvan"
                className="select"
              >
                <option value="Panelvan">Panelvan</option>
                <option value="Kamyonet">Kamyonet</option>
              </select>
            </label>
            <label>
              Dorse Tipi
              <select
                name="trailerType"
                defaultValue="Frigo"
                className="select"
              >
                <option value="Frigo">Frigo</option>
                <option value="Kapalı">Kapalı</option>
              </select>
            </label>
            <label>
              Zemin Tipi
              <select
                name="floorType"
                defaultValue="Tahta Taban"
                className="select"
              >
                <option value="Tahta Taban">Tahta Taban</option>
                <option value="Sac Taban">Sac Taban</option>
              </select>
            </label>
            <label>
              Maksimum Yük Miktarı
              <select name="maxLoad" defaultValue="15" className="select">
                {Array.from({ length: 16 }, (_, i) => 15 + i).map((n) => (
                  <option key={n} value={n}>
                    {n} ton
                  </option>
                ))}
              </select>
            </label>
          </section>

          <button type="submit" className="save-btn">
            Kaydet
          </button>
        </form>
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
        }
        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }
        .avatar-img {
          border-radius: 50%;
          border: 2px solid #1a237e;
        }
        .profile-header h1 {
          font-size: 24px;
          font-weight: 600;
          margin-top: 12px;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        section {
          margin-bottom: 24px;
        }
        h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        label {
          display: flex;
          flex-direction: column;
          font-size: 16px;
          margin-bottom: 12px;
          width: 100%;
        }
        input,
        .select {
          box-sizing: border-box;
          width: 100%;
          height: 48px;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-top: 8px;
          appearance: none;
        }
        .change-pass {
          font-size: 14px;
          color: #1a237e;
          text-decoration: none;
          align-self: flex-end;
        }
        hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 0 0 24px;
        }
        .save-btn {
          margin-top: 16px;
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
