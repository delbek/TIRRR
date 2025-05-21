'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

interface ProfileData {
  phoneNumber: string;
  licensePlate: string;
  taxNumber: string;
  address: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  vehicleType: string;
  trailerType: string;
  floorTypes: string;
  maxLoadCapacity: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    phoneNumber: '',
    licensePlate: '',
    taxNumber: '',
    address: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    vehicleType: 'Panelvan',
    trailerType: 'Frigo',
    floorTypes: 'Tahta Taban',
    maxLoadCapacity: '1'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/profile', {
          headers: { Authorization: token || '' }
        });
        const data: ProfileData = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setError('Profil yüklenirken bir hata oluştu.');
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError('Sunucuya bağlanılamadı.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok && data.status) {
        setSuccess('Kaydetme başarılı');
        setShowSuccess(true);
      } else {
        setError('Kaydetme başarısız oldu.');
      }
    } catch (err) {
      console.error('Update profile error:', err);
      setError('Bir hata oluştu.');
    } finally {
      setLoadingSave(false);
    }
  };

  if (loading) {
    return <div className="px-6 pt-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="px-6 pt-10 text-red-500">{error}</div>;
  }

  if (!profile) return null;

  return (
    <div className="page">
      <Head>
        <title>Profil - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="px-6 py-8 bg-gray-50 min-h-screen flex flex-col">
        <div className="profile-header flex flex-col items-center mb-6">
          <Image
            src="/profile-avatar.png"
            alt="Profil Resmi"
            width={80}
            height={80}
            className="avatar-img"
          />
          <h1 className="text-2xl font-semibold mt-3">Profil</h1>
        </div>

        <form className="flex-grow flex flex-col" onSubmit={handleSave}>
          {/* Hesap Bilgileri */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Hesap Bilgileriniz</h2>
            <label className="block mb-4">
              Telefon Numaranız
              <input
                type="text"
                value={profile?.phoneNumber}
                onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Plakanız
              <input
                type="text"
                value={profile?.licensePlate}
                onChange={(e) => setProfile({ ...profile, licensePlate: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Vergi Numaranız
              <input
                type="text"
                value={profile?.taxNumber}
                onChange={(e) => setProfile({ ...profile, taxNumber: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block">
              Adresiniz
              <input
                type="text"
                value={profile?.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
          </section>

          {/* Kişisel Bilgiler */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Kişisel Bilgileriniz</h2>
            <label className="block mb-4">
              İsim
              <input
                type="text"
                value={profile?.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Soyisim
              <input
                type="text"
                value={profile?.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
            <label className="block">
              Doğum Tarihi
              <input
                type="date"
                value={profile?.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>
          </section>

          {/* Araç Bilgileri */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Araç Bilgileriniz</h2>
            <label className="block mb-4">
              Araç Tipi
              <select
                value={profile?.vehicleType}
                onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              >
                <option>Panelvan</option>
                <option>Kamyonet</option>
              </select>
            </label>
            <label className="block mb-4">
              Dorse Tipi
              <select
                value={profile?.trailerType}
                onChange={(e) => setProfile({ ...profile, trailerType: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              >
                <option>Frigo</option>
                <option>Kapalı</option>
              </select>
            </label>
            <label className="block mb-4">
              Zemin Tipi
              <select
                value={profile?.floorTypes}
                onChange={(e) => setProfile({ ...profile, floorTypes: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              >
                <option>Tahta Taban</option>
                <option>Sac Taban</option>
              </select>
            </label>
            <label className="block">
              Maksimum Yük
              <select
                value={profile?.maxLoadCapacity}
                onChange={(e) => setProfile({ ...profile, maxLoadCapacity: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n}>{n} ton</option>
                ))}
              </select>
            </label>
          </section>

          <button
            type="submit"
            disabled={loadingSave}
            className="save-btn mt-auto bg-blue-700 text-white py-3 rounded-lg text-lg disabled:opacity-50"
          >
            {loadingSave ? 'Kaydediliyor...' : 'Kaydet'}
          </button>

          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-xl">
                <p className="mb-4">{success}</p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                >
                  Kapat
                </button>
              </div>
            </div>
          )}
        </form>
      </main>

      <style jsx>{`
        .page {
          padding: 16px;
          background: #f8f8f8;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
        }
        .avatar-img {
          border-radius: 50%;
          border: 2px solid #1a237e;
        }
        .save-btn {
          width: 100%;
          margin-top: 24px;
        }
      `}</style>
    </div>
  );
}
