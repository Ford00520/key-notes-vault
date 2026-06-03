'use client'

import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { mockNotes, type KeyNote } from '@/lib/mockData'
import { createMockProof, getStatusCounts, latestActiveNote } from '@/lib/noteLogic'
import { trackTransaction } from '@/utils/track'

type ActionState = 'ready' | 'submitting' | 'sealed' | 'revealed' | 'archived' | 'copied'

function fakeTxHash(seed: string) {
  return createMockProof(`${seed}-${Date.now()}-tx`).padEnd(66, '0').slice(0, 66)
}

export function useKeyNotesVault() {
  const { address, isConnected } = useAccount()
  const [notes, setNotes] = useState<KeyNote[]>(mockNotes)
  const [activeId, setActiveId] = useState(mockNotes[0]?.id ?? '')
  const [actionState, setActionState] = useState<ActionState>('ready')
  const [lastTxHash, setLastTxHash] = useState('')

  const activeNote = notes.find((note) => note.id === activeId) ?? notes[0]
  const counts = useMemo(() => getStatusCounts(notes), [notes])
  const latestNote = useMemo(() => latestActiveNote(notes), [notes])
  const archiveRecords = useMemo(
    () => notes.filter((note) => note.status === 'archived'),
    [notes]
  )

  async function runTrackedAction(nextState: ActionState, seed: string) {
    const txHash = fakeTxHash(seed)
    setActionState('submitting')
    await new Promise((resolve) => setTimeout(resolve, 420))
    setLastTxHash(txHash)
    setActionState(nextState)

    await trackTransaction(
      'app-key-notes',
      'base-split-vault-key-notes',
      address,
      txHash
    )

    window.setTimeout(() => setActionState('ready'), 1800)
  }

  function createNote(title: string, body: string) {
    const next: KeyNote = {
      id: `slot-${String(notes.length + 1).padStart(3, '0')}`,
      index: notes.length + 1,
      title: title || 'Untitled Key Note',
      body: body || 'Short private memo.',
      status: 'draft',
      proofHash: createMockProof(`${title}-${body}`),
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
      visibility: 'private',
      slotLane: `N${notes.length + 1}`
    }

    setNotes((current) => [next, ...current])
    setActiveId(next.id)
  }

  async function sealNote(id = activeNote?.id) {
    if (!id) return
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, status: 'sealed', visibility: 'private' } : note
      )
    )
    await runTrackedAction('sealed', `seal-${id}`)
  }

  async function revealNote(id = activeNote?.id) {
    if (!id) return
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, status: 'revealed', visibility: 'public' } : note
      )
    )
    await runTrackedAction('revealed', `reveal-${id}`)
  }

  async function archiveNote(id = activeNote?.id) {
    if (!id) return
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? {
              ...note,
              status: 'archived',
              visibility: 'recorded',
              archivedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'
            }
          : note
      )
    )
    await runTrackedAction('archived', `archive-${id}`)
  }

  function noteById(id: string) {
    return notes.find((note) => note.id === id) ?? notes[0]
  }

  // TODO: Replace mock reads with wagmi useReadContract calls.
  // TODO: Replace mock note actions with wagmi useWriteContract flow.
  // TODO: Call trackTransaction after a successful transaction hash is available.
  return {
    address,
    isConnected,
    hasVault: notes.length > 0,
    notes,
    activeId,
    activeNote,
    latestNote,
    counts,
    archiveRecords,
    actionState,
    lastTxHash,
    setActiveId,
    createNote,
    sealNote,
    revealNote,
    archiveNote,
    noteById
  }
}
