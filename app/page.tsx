'use client'

import addIcon from '@/images/addIcon.svg'
import Image from 'next/image'
import { useState } from 'react'
import { RegisterProduct } from './register-product'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full flex-col items-center sm:items-start">
        <div className="w-full h-2/4 bg-white rounded-2xl p-6 shadow-lg flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer w-full sm:w-auto bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Image src={addIcon} alt="" width={20} height={20} />
            Novo Produto
          </button>
        </div>

        <RegisterProduct isModalOpen={isModalOpen} />
      </main>
    </div>
  )
}
