'use client'

import { KeyVaultHeader } from '@/components/KeyVaultHeader'
import { MyNotesPanel } from '@/components/MyNotesPanel'
import { useKeyNotesVault } from '@/hooks/useKeyNotesVault'

export default function MyNotesPage() {
  const { notes, hasVault } = useKeyNotesVault()

  return (
    <main className="screen">
      <div className="app-shell">
        <KeyVaultHeader />
        <div className="my-layout">
          <div className="personal-rail panel">
            <span>01</span>
            <span>Wallet Vault</span>
            <span>02</span>
            <span>Note States</span>
            <span>03</span>
            <span>Proof Access</span>
          </div>
          <MyNotesPanel hasVault={hasVault} notes={notes} />
        </div>
      </div>
    </main>
  )
}
