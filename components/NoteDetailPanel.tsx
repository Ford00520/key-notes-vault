import { ArrowLeft, Clock, Eye, Hash, ListOrdered } from 'lucide-react'
import Link from 'next/link'
import type { KeyNote } from '@/lib/mockData'
import { CopyNoteProofButton } from './CopyNoteProofButton'
import { NoteStatusChip } from './NoteStatusChip'

export function NoteDetailPanel({ note }: { note: KeyNote }) {
  return (
    <section className="detail-panel panel console-panel">
      <div className="detail-topline">
        <Link className="button secondary" href="/notes">
          <ArrowLeft size={16} />
          Back
        </Link>
        <NoteStatusChip status={note.status} />
      </div>
      <div className="detail-grid">
        <div className="detail-status">
          <p className="thin-label">Proof Board</p>
          <h1>{note.title}</h1>
          <div className="detail-index">{note.slotLane}</div>
        </div>
        <div className="detail-proof">
          <div className="proof-block">
            <Hash size={14} />
            {note.proofHash}
          </div>
          <CopyNoteProofButton proof={note.proofHash} />
        </div>
      </div>
      <div className="detail-records">
        <span>
          <ListOrdered size={16} />
          Index {note.index}
        </span>
        <span>
          <Clock size={16} />
          {note.createdAt}
        </span>
        <span>
          <Eye size={16} />
          {note.visibility}
        </span>
      </div>
      <p className="detail-body">{note.body}</p>
    </section>
  )
}
