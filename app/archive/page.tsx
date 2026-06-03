'use client'

import { Archive, Hash } from 'lucide-react'
import { ArchiveTimeline } from '@/components/ArchiveTimeline'
import { EmptyState } from '@/components/EmptyState'
import { KeyVaultHeader } from '@/components/KeyVaultHeader'
import { useKeyNotesVault } from '@/hooks/useKeyNotesVault'

export default function ArchivePage() {
  const { archiveRecords } = useKeyNotesVault()
  const latest = archiveRecords[0]

  return (
    <main className="screen">
      <div className="app-shell">
        <KeyVaultHeader />
        <section className="archive-layout">
          <div className="archive-heading panel">
            <Archive size={24} />
            <div>
              <p className="thin-label">Sealed Archive</p>
              <h1>Record timeline</h1>
            </div>
          </div>
          {latest ? (
            <div className="archive-proof-strip panel">
              <span>latest</span>
              <Hash size={16} />
              <strong>{latest.proofHash}</strong>
            </div>
          ) : null}
          {archiveRecords.length ? (
            <ArchiveTimeline records={archiveRecords} />
          ) : (
            <EmptyState title="No archive records" text="Archived proofs will appear here." />
          )}
        </section>
      </div>
    </main>
  )
}
