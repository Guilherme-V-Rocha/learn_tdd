'use client'
import checkIcon from '@/images/checkedIcon.svg'
import closeIcon from '@/images/closeIcon.svg'
import Image from 'next/image'
import { createContext, useContext, useState } from 'react'

type ToastContextType = {
  triggerToast: (message: string, type: 'success' | 'error') => void
}
const ToastContext = createContext<ToastContextType>({} as ToastContextType)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)

    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      {showToast && (
        <div
          id="toast-success"
          className="mb-4 flex items-center self-end justify-end-safe w-full max-w-sm p-4 text-body rounded-base shadow-xs bg-green-700 rounded-2xl z-10"
          role="alert"
        >
          <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
            <Image src={checkIcon} alt="" />
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal text-white">
            {toastMessage}
          </div>
          <button
            type="button"
            className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          >
            <span className="sr-only">Close</span>
            <Image src={closeIcon} alt="" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  return useContext(ToastContext)
}
