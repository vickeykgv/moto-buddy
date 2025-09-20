import { useEffect, useRef } from 'react'
import { getUnsyncedLogs, markSynced } from '../storage'
import axios from 'axios'

export default function useSync(isOnline) {
  const syncingRef = useRef(false)

  useEffect(() => {
    if (!isOnline) return

    async function syncLogs() {
      if (syncingRef.current) return
      syncingRef.current = true
      try {
        const logs = await getUnsyncedLogs()
        for (const l of logs) {
          try {
            // replace with your API endpoint
            console.log('hellow')
            await axios.post('http://localhost:4000/api/logs', l.payload)
            await markSynced(l.id)
          } catch (err) {
            console.error('Failed to sync log', l.id, err)
            // leave unsynced entry for next attempt
          }
        }
      } finally {
        syncingRef.current = false
      }
    }

    syncLogs()
  }, [isOnline])
}
