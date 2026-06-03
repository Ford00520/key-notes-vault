'use client'

import { Archive, Eye, FileKey, KeyRound, LockKeyhole } from 'lucide-react'
import type { KeyNote } from '@/lib/mockData'
import { NoteStatusChip } from './NoteStatusChip'

export function KeyRail({
  notes,
  activeId,
  onSelect
}: {
  notes: KeyNote[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <aside className="key-rail panel">
      <div className="rail-heading">
        <KeyRound size={18} />
        <span>Key Rail</span>
      </div>
      <div className="rail-slots">
        {notes.map((note) => {
          const Icon =
            note.status === 'sealed'
              ? LockKeyhole
              : note.status === 'revealed'
                ? Eye
                : note.status === 'archived'
                  ? Archive
                  : FileKey
          return (
            <button
              className={note.id === activeId ? 'rail-slot active' : 'rail-slot'}
              key={note.id}
              onClick={() => onSelect(note.id)}
              type="button"
            >
              <span className="rail-slot-index">{note.slotLane}</span>
              <Icon size={16} />
              <span className="rail-slot-title">{note.title}</span>
              <NoteStatusChip status={note.status} />
            </button>
          )
        })}
      </div>
    </aside>
  )
}
