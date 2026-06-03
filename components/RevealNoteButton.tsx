'use client'

import { Eye } from 'lucide-react'

export function RevealNoteButton({
  disabled,
  isSubmitting,
  onClick
}: {
  disabled?: boolean
  isSubmitting?: boolean
  onClick: () => void
}) {
  return (
    <button className="button saffron action-button" disabled={disabled || isSubmitting} onClick={onClick} type="button">
      <Eye size={17} />
      {isSubmitting ? 'Revealing' : 'Reveal Note'}
    </button>
  )
}
