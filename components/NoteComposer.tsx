'use client'

import { FormEvent, useState } from 'react'
import { FilePlus2 } from 'lucide-react'

export function NoteComposer({ onCreate }: { onCreate: (title: string, body: string) => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    onCreate(title.trim(), body.trim())
    setTitle('')
    setBody('')
  }

  return (
    <form className="note-composer panel" onSubmit={submit}>
      <div>
        <p className="thin-label">Create Note</p>
        <h2 className="section-title">New key slot memo</h2>
      </div>
      <input
        className="field"
        maxLength={48}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Slot title"
        value={title}
      />
      <textarea
        className="textarea"
        maxLength={180}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Short private note"
        value={body}
      />
      <button className="button" type="submit">
        <FilePlus2 size={16} />
        Create Note
      </button>
    </form>
  )
}
