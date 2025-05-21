'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/notifications', {
          headers: {
            'Authorization': token || ''
          }
        });
        const data = await res.json();
        if (res.ok) {
          const list = Object.entries(data)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([, note]) => note as string);
          setNotifications(list);
        } else {
          setError('Bildirimler yüklenirken bir hata oluştu.');
        }
      } catch (err) {
        console.error('Fetch notifications error:', err);
        setError('Sunucuya bağlanılamadı.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="min-h-screen p-6">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="min-h-screen p-6 text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Bildirimler</h1>
      <div className="divide-y divide-gray-300">
        {notifications.map((note, idx) => (
          <div key={idx} className="py-4 text-lg font-medium text-black">
            {note}
          </div>
        ))}
      </div>
    </main>
  );
}
