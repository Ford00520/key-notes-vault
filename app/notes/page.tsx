'use client'

import { ShieldCheck } from 'lucide-react'
import { KeyRail } from '@/components/KeyRail'
import { KeyVaultHeader } from '@/components/KeyVaultHeader'
import { NoteComposer } from '@/components/NoteComposer'
import { NoteSlotBoard } from '@/components/NoteSlotBoard'
import { useKeyNotesVault } from '@/hooks/useKeyNotesVault'

export default function NotesPage() {
  const vault = useKeyNotesVault()

  return (
    <main className="screen">
      <div className="app-shell">
        <KeyVaultHeader />
        <div className="notes-layout">
          <div className="notes-rule panel">
            <ShieldCheck size={18} />
            <span>One wallet, one note vault.</span>
          </div>
          <KeyRail activeId={vault.activeId} notes={vault.notes} onSelect={vault.setActiveId} />
          <NoteSlotBoard
            actionState={vault.actionState}
            activeId={vault.activeId}
            activeNote={vault.activeNote}
            lastTxHash={vault.lastTxHash}
            notes={vault.notes}
            onArchive={() => vault.archiveNote()}
            onReveal={() => vault.revealNote()}
            onSeal={() => vault.sealNote()}
            onSelect={vault.setActiveId}
          />
          <NoteComposer onCreate={vault.createNote} />
        </div>
      </div>
    </main>
  )
}
