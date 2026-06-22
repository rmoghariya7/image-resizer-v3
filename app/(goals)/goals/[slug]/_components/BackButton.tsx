'use client'

import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  function handleBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/goals')
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-indigo-600 transition-colors hover:text-indigo-500 sm:mb-4"
    >
      <span aria-hidden="true">←</span>
      Back
    </button>
  )
}
