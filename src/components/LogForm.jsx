import { useState } from 'react'
import { saveLog } from '../storage'

export default function LogForm({ onSaved }) {
  const [text, setText] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    const entry = await saveLog({ text })
    setText('')
    if (onSaved) onSaved(entry)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Type log...'
        style={{ flex: 1 }}
      />
      <button type='submit'>Save (offline)</button>
    </form>
  )
}
