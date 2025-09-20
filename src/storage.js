import localforage from 'localforage'

localforage.config({
  name: 'offline-logger',
  storeName: 'logs'
})

export async function saveLog(payload) {
  const logs = (await localforage.getItem('logs')) || []
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
  const entry = {
    id,
    payload,
    createdAt: new Date().toISOString(),
    synced: false
  }
  logs.push(entry)
  await localforage.setItem('logs', logs)
  return entry
}

export async function getAllLogs() {
  return (await localforage.getItem('logs')) || []
}

export async function getUnsyncedLogs() {
  const logs = await getAllLogs()
  return logs.filter(l => !l.synced)
}

export async function markSynced(id) {
  const logs = await getAllLogs()
  const updated = logs.map(l => l.id === id ? { ...l, synced: true } : l)
  await localforage.setItem('logs', updated)
}
