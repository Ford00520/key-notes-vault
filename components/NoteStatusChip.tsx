import { Circle, CopyCheck } from 'lucide-react'
import type { NoteStatus } from '@/lib/mockData'
import { statusTone } from '@/lib/noteLogic'

export function NoteStatusChip({ status }: { status: NoteStatus }) {
  const Icon = status === 'copied' ? CopyCheck : Circle

  return (
    <span className={`status-chip ${statusTone(status)}`}>
      <Icon size={10} fill="currentColor" />
      {status}
    </span>
  )
}
