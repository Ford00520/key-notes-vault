'use client'

import { useParams } from 'next/navigation'
import { KeyVaultHeader } from '@/components/KeyVaultHeader'
import { NoteDetailPanel } from '@/components/NoteDetailPanel'
import { useKeyNotesVault } from '@/hooks/useKeyNotesVault'

export default function NoteDetailPage() {
  const params = useParams<{ id: string }>()
  const { noteById } = useKeyNotesVault()
  const note = noteById(params.id)

  return (
    <main className="screen">
      <div className="app-shell">
        <KeyVaultHeader />
        <div className="detail-layout">
          <NoteDetailPanel note={note} />
          <aside className="visibility-panel panel">
            <p className="thin-label">Visibility Context</p>
            <h2>{note.visibility}</h2>
            <div className="visibility-lane">
              <span>private</span>
              <span className={note.visibility === 'private' ? 'lane-dot active' : 'lane-dot'} />
            </div>
            <div className="visibility-lane">
              <span>public</span>
              <span className={note.visibility === 'public' ? 'lane-dot active' : 'lane-dot'} />
            </div>
            <div className="visibility-lane">
              <span>recorded</span>
              <span className={note.visibility === 'recorded' ? 'lane-dot active' : 'lane-dot'} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
