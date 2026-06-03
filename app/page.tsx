'use client'

import { Archive, ArrowRight, Hash, LockKeyhole, RadioTower } from 'lucide-react'
import Link from 'next/link'
import { KeyRail } from '@/components/KeyRail'
import { KeyVaultHeader } from '@/components/KeyVaultHeader'
import { NoteStatusChip } from '@/components/NoteStatusChip'
import { useKeyNotesVault } from '@/hooks/useKeyNotesVault'

export default function HomePage() {
  const { notes, activeId, setActiveId, counts, latestNote, activeNote, isConnected } = useKeyNotesVault()

  return (
    <main className="screen">
      <div className="app-shell">
        <KeyVaultHeader />
        <div className="vault-grid home-grid">
          <KeyRail activeId={activeId} notes={notes} onSelect={setActiveId} />

          <section className="home-desk panel console-panel">
            <div className="home-ledger">
              <div>
                <p className="thin-label">Sealed Notes</p>
                <div className="count-number">{counts.sealed}</div>
              </div>
              <LockKeyhole size={42} />
            </div>
            <div className="latest-note-slab">
              <div>
                <p className="thin-label">Latest Note</p>
                <h1>{latestNote.title}</h1>
              </div>
              <NoteStatusChip status={latestNote.status} />
              <p>{latestNote.body}</p>
              <div className="proof-block">
                <Hash size={14} />
                {latestNote.proofHash}
              </div>
            </div>
            <div className="home-actions">
              <Link className="button" href="/notes">
                Open Notes
                <ArrowRight size={16} />
              </Link>
              <Link className="button secondary" href="/archive">
                View Archive
                <Archive size={16} />
              </Link>
            </div>
          </section>

          <aside className="sealed-panel panel">
            <div className="sealed-panel-top">
              <RadioTower size={20} />
              <span>{isConnected ? 'Wallet online' : 'Wallet standby'}</span>
            </div>
            <div className="sealed-meter">
              <span>draft</span>
              <strong>{counts.draft}</strong>
            </div>
            <div className="sealed-meter strong">
              <span>sealed</span>
              <strong>{counts.sealed}</strong>
            </div>
            <div className="sealed-meter">
              <span>revealed</span>
              <strong>{counts.revealed}</strong>
            </div>
            <div className="sealed-meter">
              <span>archived</span>
              <strong>{counts.archived}</strong>
            </div>
            <div className="current-seal">
              <p className="thin-label">Current Sealed Note</p>
              <h2>{activeNote.status === 'sealed' ? activeNote.title : 'No sealed slot selected'}</h2>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
