import { Archive, Clock, Hash } from 'lucide-react'
import type { KeyNote } from '@/lib/mockData'
import { CopyNoteProofButton } from './CopyNoteProofButton'

export function ArchiveTimeline({ records }: { records: KeyNote[] }) {
  return (
    <section className="archive-wall">
      {records.map((record, index) => (
        <article className={index === 0 ? 'archive-record latest panel' : 'archive-record panel'} key={record.id}>
          <div className="archive-node">
            <Archive size={18} />
          </div>
          <div className="archive-record-main">
            <div className="archive-record-head">
              <div>
                <p className="thin-label">{index === 0 ? 'Latest Archive' : 'Archive Record'}</p>
                <h2>{record.title}</h2>
              </div>
              <CopyNoteProofButton proof={record.proofHash} />
            </div>
            <p>{record.body}</p>
            <div className="archive-meta">
              <span>
                <Clock size={15} />
                {record.archivedAt ?? record.createdAt}
              </span>
              <span>
                <Hash size={15} />
                {record.proofHash.slice(0, 20)}...
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
