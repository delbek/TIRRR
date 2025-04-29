"use client";

import Head from 'next/head';
import Image from 'next/image';

export default function Profile() {
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

        <form className="form">
          <section>
            <h2>Hesap Bilgileriniz</h2>
            <label>
              Telefon Numaranız
              <input type="text" defaultValue="05316882362" />
            </label>
            <label>
              Şifreniz
              <input type="password" defaultValue="**********" />
            </label>
            <a href="#" className="change-pass">Şifreyi Değiştir</a>
          </section>

          <hr />

          <section>
            <h2>İş Bilgileriniz</h2>
            <label>
              Plakanız
              <input type="text" defaultValue="42TC432" />
            </label>
            <label>
              Vergi Numaranız
              <input type="text" defaultValue="4534895739842" />
            </label>
            <label>
              Adresiniz
              <input type="text" defaultValue="Levent/İstanbul" />
            </label>
          </section>

          <hr />

          <section>
            <h2>Kişisel Bilgileriniz</h2>
            <label>
              İsminiz
              <input type="text" defaultValue="Sude" />
            </label>
            <label>
              Soyisminiz
              <input type="text" defaultValue="Sır" />
            </label>
            <label>
              Doğum Tarihiniz
              <input type="date" defaultValue="2005-10-23" />
            </label>
          </section>

          <hr />

          <section>
            <h2>Araç Bilgileriniz</h2>
            <label>
              Araç Tipi
              <select defaultValue="Panelvan" className="tall-select">
                <option value="Panelvan">Panelvan</option>
                <option value="Kamyonet">Kamyonet</option>
              </select>
            </label>
            <label>
              Dorse Tipi
              <select defaultValue="Frigo" className="tall-select">
                <option value="Frigo">Frigo</option>
                <option value="Kapalı">Kapalı</option>
              </select>
            </label>
            <label>
              Zemin Tipi
              <select defaultValue="Tahta Taban" className="tall-select">
                <option value="Tahta Taban">Tahta Taban</option>
                <option value="Sac Taban">Sac Taban</option>
              </select>
            </label>
            <label>
              Maksimum Yük Miktarı
              <select defaultValue="15" className="tall-select">
                {Array.from({ length: 16 }, (_, i) => 15 + i).map((n) => (
                  <option key={n} value={n}>{n} ton</option>
                ))}
              </select>
            </label>
          </section>

          <button type="submit" className="save-btn">Kaydet</button>
        </form>
      </main>

      <style jsx>{`
        .page {
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
        input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          margin-top: 8px;
          width: 100%;
        }
        /* Double the previous height again: 48px vertical padding */
        .tall-select {
          padding: 48px 12px;
          font-size: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-top: 8px;
          width: 100%;
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
