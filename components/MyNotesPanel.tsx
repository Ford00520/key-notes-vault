import { Archive, Eye, LockKeyhole, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import type { KeyNote } from '@/lib/mockData'
import { NoteStatusChip } from './NoteStatusChip'

export function MyNotesPanel({ notes, hasVault }: { notes: KeyNote[]; hasVault: boolean }) {
  const groups = [
    { label: 'Sealed Notes', status: 'sealed', icon: LockKeyhole },
    { label: 'Revealed Notes', status: 'revealed', icon: Eye },
    { label: 'Archived Notes', status: 'archived', icon: Archive }
  ] as const

  return (
    <section className="my-notes-panel">
      <div className="wallet-record panel">
        <ShieldCheck size={22} />
        <div>
          <p className="thin-label">Wallet Record</p>
          <h1>{hasVault ? 'Vault detected' : 'No vault found'}</h1>
          <p>One wallet, one note vault.</p>
        </div>
      </div>
      <div className="registry-columns">
        {groups.map((group) => {
          const Icon = group.icon
          const groupNotes = notes.filter((note) => note.status === group.status)
          return (
            <div className="registry-column panel" key={group.label}>
              <div className="registry-column-head">
                <Icon size={18} />
                <span>{group.label}</span>
                <strong>{groupNotes.length}</strong>
              </div>
              {groupNotes.map((note) => (
                <Link className="registry-row" href={`/note/${note.id}`} key={note.id}>
                  <span>{note.slotLane}</span>
                  <strong>{note.title}</strong>
                  <NoteStatusChip status={note.status} />
                </Link>
              ))}
            </div>
          )
        })}
      </div>
      <div className="my-actions">
        <Link className="button" href="/notes">
          Open Notes
        </Link>
        <Link className="button secondary" href="/archive">
          View Archive
        </Link>
      </div>
    </section>
  )
}
