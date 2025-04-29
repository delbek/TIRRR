import React from 'react';

export default function NotificationsPage() {
  // Dummy notifications list
  const notifications = Array.from({ length: 8 }, (_, i) => `Bildirim #${i + 1}`);

  return (
    <main className="min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Bildirimler</h1>

      {/* Notifications List */}
      <div className="divide-y divide-gray-300">
        {notifications.map((note, idx) => (
          <div
            key={idx}
            className="py-4 text-lg font-medium text-black"
          >
            {note}
          </div>
        ))}
      </div>
    </main>
  );
}
