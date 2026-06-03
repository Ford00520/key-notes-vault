export type NoteStatus = 'ready' | 'draft' | 'sealed' | 'revealed' | 'archived' | 'copied'

export type KeyNote = {
  id: string
  index: number
  title: string
  body: string
  status: Exclude<NoteStatus, 'ready' | 'copied'>
  proofHash: string
  createdAt: string
  archivedAt?: string
  visibility: 'private' | 'public' | 'recorded'
  slotLane: string
}

export const mockNotes: KeyNote[] = [
  {
    id: 'slot-001',
    index: 1,
    title: 'Bridge Fee Snapshot',
    body: 'Saved routing fee note for the weekly vault review.',
    status: 'sealed',
    proofHash: '0x9ac31eeb56c47c32b9d1df209346c1e29836d4403d9167139361adee2266fc4e',
    createdAt: '2026-05-29 09:12 UTC',
    visibility: 'private',
    slotLane: 'Slot 01'
  },
  {
    id: 'slot-002',
    index: 2,
    title: 'Release Window',
    body: 'Target publish window kept for the next Base miniapp pass.',
    status: 'draft',
    proofHash: '0x55f697b57b22030486e94f39012cc85f697b57b22030486e9aa144f0a98115ee',
    createdAt: '2026-05-30 14:42 UTC',
    visibility: 'private',
    slotLane: 'Slot 02'
  },
  {
    id: 'slot-003',
    index: 3,
    title: 'Partner Memo',
    body: 'Short partner confirmation revealed for shared review.',
    status: 'revealed',
    proofHash: '0x72c9ac31eeb56c47c32b9d1df209346c1e29836d4403d9167139361adee2266',
    createdAt: '2026-05-27 17:08 UTC',
    visibility: 'public',
    slotLane: 'Slot 03'
  },
  {
    id: 'slot-004',
    index: 4,
    title: 'Old Checkpoint',
    body: 'Archived checkpoint note with retained proof.',
    status: 'archived',
    proofHash: '0x1997b2a5f7c751001aaf5fe9122349136a041df6c64c06cd757abb94722c9a',
    createdAt: '2026-05-21 11:19 UTC',
    archivedAt: '2026-05-31 16:30 UTC',
    visibility: 'recorded',
    slotLane: 'Slot 04'
  }
]

export const connectedVaultAddress = '0x7a42...91f0'
