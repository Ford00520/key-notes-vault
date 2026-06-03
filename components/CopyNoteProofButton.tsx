'use client'

import { Copy } from 'lucide-react'
import { useState } from 'react'
import { NoteStatusChip } from './NoteStatusChip'

export function CopyNoteProofButton({ proof }: { proof: string }) {
  const [copied, setCopied] = useState(false)

  async function copyProof() {
    await navigator.clipboard.writeText(proof)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="copy-proof">
      <button className="icon-button" onClick={copyProof} title="Copy proof" type="button">
        <Copy size={16} />
      </button>
      {copied ? <NoteStatusChip status="copied" /> : null}
    </div>
  )
}
