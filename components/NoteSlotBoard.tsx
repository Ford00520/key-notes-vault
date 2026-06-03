'use client'

import { EyeOff, FileText, Hash, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import type { KeyNote } from '@/lib/mockData'
import { ActionBar } from './ActionBar'
import { CopyNoteProofButton } from './CopyNoteProofButton'
import { NoteStatusChip } from './NoteStatusChip'

export function NoteSlotBoard({
  notes,
  activeNote,
  activeId,
  actionState,
  lastTxHash,
  onSelect,
  onSeal,
  onReveal,
  onArchive
}: {
  notes: KeyNote[]
  activeNote: KeyNote
  activeId: string
  actionState: string
  lastTxHash: string
  onSelect: (id: string) => void
  onSeal: () => void
  onReveal: () => void
  onArchive: () => void
}) {
  const isSubmitting = actionState === 'submitting'

  return (
    <section className="slot-board panel console-panel">
      <div className="slot-board-header">
        <div>
          <p className="thin-label">Note Slot Desk</p>
          <h1>Key slot execution</h1>
        </div>
        <NoteStatusChip status={actionState === 'submitting' ? 'ready' : activeNote.status} />
      </div>

      <div className="active-slab">
        <div className="slab-index">{activeNote.slotLane}</div>
        <div className="slab-main">
          <div className="slab-title-row">
            <h2>{activeNote.title}</h2>
            <Link className="button secondary" href={`/note/${activeNote.id}`}>
              <FileText size={16} />
              Detail
            </Link>
          </div>
          <p>{activeNote.body}</p>
          <div className="proof-block">
            <Hash size={14} />
            {activeNote.proofHash}
          </div>
        </div>
      </div>

      <ActionBar
        isSubmitting={isSubmitting}
        note={activeNote}
        onArchive={onArchive}
        onReveal={onReveal}
        onSeal={onSeal}
      />

      {lastTxHash ? <div className="toast">Transaction tracked: {lastTxHash.slice(0, 18)}...</div> : null}

      <div className="slot-lanes">
        {notes.map((note) => (
          <button
            className={note.id === activeId ? 'slot-tile active' : 'slot-tile'}
            key={note.id}
            onClick={() => onSelect(note.id)}
            type="button"
          >
            <span className="slot-tile-line" />
            <span className="slot-tile-top">
              <strong>{note.slotLane}</strong>
              <NoteStatusChip status={note.status} />
            </span>
            <span className="slot-tile-title">{note.title}</span>
            <span className="slot-tile-meta">
              {note.status === 'sealed' ? <LockKeyhole size={14} /> : <EyeOff size={14} />}
              {note.visibility}
            </span>
          </button>
        ))}
      </div>

      <div className="copy-row">
        <span className="muted">Proof copy lane</span>
        <CopyNoteProofButton proof={activeNote.proofHash} />
      </div>
    </section>
  )
}
