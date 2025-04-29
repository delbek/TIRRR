"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Messages() {
  const [filter, setFilter] = useState('all');

  const messages = [
    { id: 1, name: 'Suzan Kılıç', avatar: '/avatars/suzan.jpg', last: 'Merhaba!', time: '18:31', unread: 5, status: 'away' },
    { id: 2, name: 'Ahmet Yiğit', avatar: '/avatars/ahmet.jpg', last: 'Merhaba!', time: '16:04', unread: 0, status: null },
    { id: 3, name: 'Hasan Demir', avatar: '/avatars/hasan.jpg', last: 'Merhaba!', time: '06:12', unread: 0, status: 'online', read: 'sent' },
    { id: 4, name: 'Sarp Kılınç', avatar: '/avatars/sarp.jpg', last: 'Merhaba!', time: 'Yesterday', unread: 0, status: 'offline', read: 'sent' },
    { id: 5, name: 'Ataberk Korkut', avatar: '/avatars/ataberk.jpg', last: 'Merhaba!', time: 'Yesterday', unread: 0, status: 'offline' },
  ];

  const filtered = messages.filter(msg =>
    filter === 'all' || (filter === 'unread' && msg.unread > 0)
  );

  return (
    <div className="page">
      <Head>
        <title>Son Mesajlar - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>Son Mesajlar</h1>
        <div className="tabs">
          <button
            className={filter === 'all' ? 'tab active' : 'tab'}
            onClick={() => setFilter('all')}
          >
            Tümü
          </button>
          <button
            className={filter === 'unread' ? 'tab active' : 'tab'}
            onClick={() => setFilter('unread')}
          >
            Okunmamışlar
          </button>
        </div>

        <ul className="message-list">
          {filtered.map(msg => (
            <li key={msg.id} className={msg.unread ? 'message-item unread' : 'message-item'}>
              <div className="avatar-container">
                <Image src={msg.avatar} alt={msg.name} width={64} height={64} className="avatar" />
                {msg.status && <span className={`status-dot ${msg.status}`} />}
              </div>

              <div className="message-content">
                <div className="name">{msg.name}</div>
                <div className="preview">
                  {msg.read === 'sent' ? '' : ''}{msg.last}
                </div>
              </div>

              <div className="right-content">
                <div className="time">{msg.time}</div>
                {msg.unread > 0 && <div className="badge">{msg.unread}</div>}
              </div>
            </li>
          ))}
        </ul>

        <button className="fab" aria-label="New message">➕</button>
      </main>

      <style jsx>{`
        .page {
          padding: 24px;
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
        h1 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        .tab {
          padding: 12px 20px;
          border-radius: 6px;
          border: none;
          background: #f0f0f0;
          font-size: 16px;
          cursor: pointer;
        }
        .tab.active {
          background: #1a237e;
          color: white;
        }
        .message-list {
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 16px;
        }
        .message-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          background: white;
          margin-bottom: 16px;
        }
        .message-item.unread {
          background: #e8eafe;
        }
        .avatar-container {
          position: relative;
          margin-right: 16px;
        }
        .avatar {
          border-radius: 50%;
        }
        .status-dot {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 14px;
          height: 14px;
          border: 2px solid white;
          border-radius: 50%;
        }
        .status-dot.online {
          background: #00c851;
        }
        .status-dot.away {
          background: #ffbb33;
        }
        .status-dot.offline {
          background: #ccc;
        }
        .message-content {
          flex: 1;
        }
        .name {
          font-size: 18px;
          font-weight: 500;
        }
        .preview {
          font-size: 16px;
          color: #555;
          margin-top: 6px;
        }
        .right-content {
          text-align: right;
          margin-left: 16px;
        }
        .time {
          font-size: 14px;
          color: #888;
        }
        .badge {
          margin-top: 6px;
          background: #1a237e;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 64px;
          height: 64px;
          background: #1a237e;
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
