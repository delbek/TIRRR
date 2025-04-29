"use client";

import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function ChatDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const scrollRef = useRef(null);

  // Dummy chat data
  const chatWith = {
    name: "Suzan Kılıç",
    avatar: "/avatars/suzan.jpg",
  };

  const [messages] = useState([
    {
      id: 1,
      text: "Merhaba arkadaşlar, corona sonrası tatil planımızı konuştuk ve Bali’ye gitmeye karar verdik. Corona bitince çok büyük bir parti yapacağız! İşte gideceğimiz yerden bazı görseller.",
      time: "16.04",
      type: "received",
    },
    {
      id: 2,
      text: "Gerçekten harika bir yer! Çok doğru bir karar vermişsiniz. Tatil için sabırsızlanıyorum, bir an önce gitmek istiyorum!",
      time: "16.04",
      type: "sent",
    },
    {
      id: 3,
      text: "Tekrar merhaba, ek görsellerle devam edelim.",
      time: "16.05",
      type: "received",
    },
  ]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="page">
      <Head>
        <title>Chat with {chatWith.name} - TIRRR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="chat-header">
        <button className="back-btn" onClick={() => router.back()}>
          &larr;
        </button>
        <Image
          src={chatWith.avatar}
          alt={chatWith.name}
          width={40}
          height={40}
          className="avatar"
        />
        <span className="chat-name">{chatWith.name}</span>
        <button className="menu-btn">&#x22EE;</button>
      </div>

      <div className="messages" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`bubble ${msg.type}`}>
            <p>{msg.text}</p>
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="input-area">
        <button className="icon-btn emoji">😊</button>
        <input type="text" placeholder="Write a message..." />
        <button className="icon-btn attach">📎</button>
        <button className="send-btn" aria-label="Send message">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 21L23 12L2 3L2 10L17 12L2 14L2 21Z" fill="white" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #f8f8f8;
        }
        .chat-header {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          background: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .back-btn,
        .menu-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #333;
        }
        .back-btn {
          margin-right: 12px;
        }
        .avatar {
          border-radius: 50%;
          margin-right: 12px;
        }
        .chat-name {
          flex: 1;
          font-size: 18px;
          font-weight: 500;
          color: #1a237e;
        }
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bubble {
          max-width: 75%;
          padding: 12px;
          border-radius: 12px;
          position: relative;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .bubble.received {
          align-self: flex-start;
          background: #e0e0e0;
          color: #333;
        }
        .bubble.sent {
          align-self: flex-end;
          background: #1a237e;
          color: white;
        }
        .bubble p {
          margin: 0;
          line-height: 1.5;
          word-wrap: break-word;
          font-size: 16px;
        }
        .time {
          display: block;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 8px;
          text-align: right;
        }
        .bubble.sent .time {
          color: rgba(255, 255, 255, 0.7);
        }
        .input-area {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          background: white;
          gap: 8px;
          box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
        }
        .input-area input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 24px;
          font-size: 16px;
          outline: none;
        }
        .icon-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #555;
        }
        .send-btn {
          background: #1a237e;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .send-btn:hover {
          background: #162057;
        }
      `}</style>
    </div>
  );
}
