// app/start/wait.tsx
'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function WaitPage() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <Image
        src="/wait.png"
        alt="Tırrr Logo"
        width={250}
        height={250}
        className="cursor-pointer object-contain"
        onClick={() => router.push('/start/starter-1')}
      />
    </main>
  )
}