import { KeyNote, NoteStatus } from './mockData'

export function getStatusCounts(notes: KeyNote[]) {
  return {
    draft: notes.filter((note) => note.status === 'draft').length,
    sealed: notes.filter((note) => note.status === 'sealed').length,
    revealed: notes.filter((note) => note.status === 'revealed').length,
    archived: notes.filter((note) => note.status === 'archived').length
  }
}

export function latestActiveNote(notes: KeyNote[]) {
  return notes.find((note) => note.status !== 'archived') ?? notes[0]
}

export function statusTone(status: NoteStatus) {
  return `status-${status}`
}

export function createMockProof(input: string) {
  const clean = Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0).toString(16), '')
  return `0x${(clean + '6a1fdcf94a7867dea5dcf4f6c72e1997b2a5f7c751001aaf').slice(0, 64)}`
}
