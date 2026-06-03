'use client'

import { Archive } from 'lucide-react'

export function ArchiveNoteButton({
  disabled,
  isSubmitting,
  onClick
}: {
  disabled?: boolean
  isSubmitting?: boolean
  onClick: () => void
}) {
  return (
    <button className="button secondary action-button" disabled={disabled || isSubmitting} onClick={onClick} type="button">
      <Archive size={17} />
      {isSubmitting ? 'Archiving' : 'Archive Note'}
    </button>
  )
}
