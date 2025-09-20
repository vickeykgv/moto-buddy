import { useEffect, useState } from 'react'
import { getAllLogs } from '../storage'

export default function LogsList() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const all = await getAllLogs()
      if (mounted) setLogs(all.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
    }
    load()
    const interval = setInterval(load, 3000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  if (!logs.length) return <div>No logs yet</div>

  return (
    <ul>
      {logs.map(l => (
        <li key={l.id} style={{ opacity: l.synced ? 0.6 : 1 }}>
          <div>{l.payload.text}</div>
          <small>{new Date(l.createdAt).toLocaleString()} {l.synced ? '• synced' : '• unsynced'}</small>
        </li>
      ))}
    </ul>
  )
}
