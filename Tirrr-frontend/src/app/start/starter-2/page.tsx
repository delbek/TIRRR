// app/start/starter-2/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function StepTwo() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-white px-6 pt-4 pb-10 text-center">
      <header className="flex items-center justify-between text-sm font-medium text-black">
        <span className="text-lg font-semibold text-gray-700">2/3</span>
        <Link href="/" className="font-semibold text-black">
          Geç
        </Link>
      </header>
      <section className="mt-6 flex justify-center">
        <Image
          src="/start-2.png"
          alt="Onboarding Step 2"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </section>
      <section className="px-2 text-center">
        <h1 className="mt-6 text-xl font-bold text-black">İtibar Oluşturun</h1>
        <p className="mt-3 text-base text-gray-500">
          Yaptığınız her bir taşıma aldığınız puanlar sayesinde bir sonraki taşımanızı kolaylaştırır.
        </p>
      </section>
      <footer className="mt-6 flex items-center justify-between px-4">
        <Link href="/start/starter-1" className="text-base font-semibold text-gray-400">
          Önceki
        </Link>
        <div className="flex gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="inline-block h-2 w-4 rounded-full bg-[#0B1C39]"></span>
          <span className="inline-block h-2 w-2 rounded-full bg-gray-300"></span>
        </div>
        <Link href="/start/starter-3" className="text-base font-semibold text-[#0B1C39]">
          Sonraki
        </Link>
      </footer>
    </main>
  )
}