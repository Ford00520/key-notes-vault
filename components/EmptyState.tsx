import { FileWarning } from 'lucide-react'

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty-state panel">
      <FileWarning size={24} />
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
