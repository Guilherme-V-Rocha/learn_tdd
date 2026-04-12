'use client'
import { useState } from 'react'
// Mínimo para passar nos testes
export function Count() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
