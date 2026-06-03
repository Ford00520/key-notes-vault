'use client'

import { LockKeyhole } from 'lucide-react'

export function SealNoteButton({
  disabled,
  isSubmitting,
  onClick
}: {
  disabled?: boolean
  isSubmitting?: boolean
  onClick: () => void
}) {
  return (
    <button className="button mint action-button" disabled={disabled || isSubmitting} onClick={onClick} type="button">
      <LockKeyhole size={17} />
      {isSubmitting ? 'Sealing' : 'Seal Note'}
    </button>
  )
}
