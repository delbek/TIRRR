// app/start/starter-1/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function StepOne() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col justify-between bg-white px-6 pt-4 pb-10 text-center">
      <header className="flex items-center justify-between text-sm font-medium text-black">
        <span className="text-lg font-semibold text-gray-700">1/3</span>
        <button
          onClick={() => router.push("/")}
          className="font-semibold text-black"
        >
          Geç
        </button>
      </header>
      <section className="mt-6 flex justify-center">
        <Image
          src="/images/start/starter1.png"
          alt="Onboarding Step 1"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </section>
      <section className="px-2 text-center">
        <h1 className="mt-6 text-xl font-bold text-black">
          Taşıma Anlaşmaları Bulun
        </h1>
        <p className="mt-3 text-base text-gray-500">
          Her gün gelen onlarca mesaj ve aramadan sıkılmadınız mı? Size yakın ve
          kamyonunuza uygun olan kârlı anlaşmaları bulun.
        </p>
      </section>
      <footer className="mt-6 flex items-center justify-between px-4">
        <div className="flex gap-2">
          <span className="inline-block h-2 w-4 rounded-full bg-[#0B1C39]"></span>
          <span className="inline-block h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="inline-block h-2 w-2 rounded-full bg-gray-300"></span>
        </div>
        <button
          onClick={() => router.push("/start/starter-2")}
          className="text-base font-semibold text-[#0B1C39]"
        >
          Sonraki
        </button>
      </footer>
    </main>
  );
}
