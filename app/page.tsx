'use client'
import Image from 'next/image'
import TableExample from './table'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div>
        <h1 className={`mb-3 text-2xl font-semibold`}>Facturas</h1>
        <TableExample />
      </div>
      </div>
    </main>
  )
}
