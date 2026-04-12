'use client'

import addIcon from '@/images/addIcon.svg'
import Image from 'next/image'
import { useState } from 'react'
import { Count } from './count'
import { RegisterProduct } from './register-product'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full flex-col items-center py-32 px-16 sm:items-start">
        <Count />
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer w-full sm:w-auto bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Image src={addIcon} alt="icon to add" width={20} height={20} />
          Novo Produto
        </button>

        <RegisterProduct isModalOpen={isModalOpen} />
      </main>
    </div>
  )
}
