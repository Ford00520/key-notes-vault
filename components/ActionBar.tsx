'use client'

import type { KeyNote } from '@/lib/mockData'
import { ArchiveNoteButton } from './ArchiveNoteButton'
import { RevealNoteButton } from './RevealNoteButton'
import { SealNoteButton } from './SealNoteButton'

export function ActionBar({
  note,
  isSubmitting,
  onSeal,
  onReveal,
  onArchive
}: {
  note: KeyNote
  isSubmitting: boolean
  onSeal: () => void
  onReveal: () => void
  onArchive: () => void
}) {
  return (
    <div className="action-bar">
      <SealNoteButton
        disabled={note.status === 'sealed' || note.status === 'archived'}
        isSubmitting={isSubmitting}
        onClick={onSeal}
      />
      <RevealNoteButton
        disabled={note.status !== 'sealed'}
        isSubmitting={isSubmitting}
        onClick={onReveal}
      />
      <ArchiveNoteButton
        disabled={note.status === 'archived'}
        isSubmitting={isSubmitting}
        onClick={onArchive}
      />
    </div>
  )
}
