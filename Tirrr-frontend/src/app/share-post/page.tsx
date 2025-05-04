"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function IlanVerPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [content, setContent] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setSuccess(null);

    if (
      !from ||
      !to ||
      !weight ||
      !volume ||
      !content ||
      !dateStart ||
      !dateEnd ||
      !price
    ) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login?redirect=/ilan-ver");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from,
          to,
          weight,
          volume,
          content,
          dateStart,
          dateEnd,
          price,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Hata ${res.status}`);
      }

      setSuccess("İlanınız başarıyla yayınlandı!");
      setFrom("");
      setTo("");
      setWeight("");
      setVolume("");
      setContent("");
      setDateStart("");
      setDateEnd("");
      setPrice("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Yayınlama sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page px-4 py-6 bg-gray-50 min-h-screen">
      <Head>
        <title>İlan Ver - TIRRR</title>
      </Head>

      <main className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">İlan Ver</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span>Kalkış Noktası</span>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              disabled={loading}
              className="mt-1 p-2 border rounded"
              placeholder="Bir konum belirleyin"
            />
          </label>

          <label className="flex flex-col">
            <span>Varış Noktası</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={loading}
              className="mt-1 p-2 border rounded"
              placeholder="Bir konum belirleyin"
            />
          </label>

          <label className="flex flex-col">
            <span>Ağırlık</span>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              disabled={loading}
              className="mt-1 p-2 border rounded"
              placeholder="Bir ağırlık girin"
            />
          </label>

          <label className="flex flex-col">
            <span>Hacim</span>
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              disabled={loading}
              className="mt-1 p-2 border rounded"
              placeholder="Bir hacim girin"
            />
          </label>

          <label className="flex flex-col">
            <span>İçerik</span>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="mt-1 p-2 border rounded"
              placeholder="İçeriği girin"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span>Başlangıç Tarihi</span>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                disabled={loading}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="flex flex-col">
              <span>Bitiş Tarihi</span>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                disabled={loading}
                className="mt-1 p-2 border rounded"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span>Ücret (KDV Hariç)</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
              className="mt-1 p-2 border rounded"
              placeholder="Fiyatı girin"
            />
          </label>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-3 rounded disabled:opacity-50"
          >
            {loading ? "Yayınlanıyor…" : "Yayınla"}
          </button>
        </form>
      </main>
    </div>
  );
}
