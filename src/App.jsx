import useNetworkStatus from './hooks/useNetworkStatus'
import useSync from './hooks/useSync'
import LogForm from './components/LogForm'
import LogsList from './components/LogsList'

export default function App() {
  const isOnline = useNetworkStatus()
  useSync(isOnline)

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <header style={{ marginBottom: 12 }}>
        <h1>Offline Logger</h1>
        <div>{isOnline ? 'Online' : 'Offline — working locally'}</div>
      </header>

      <LogForm />
      <hr style={{ margin: '12px 0' }} />
      <LogsList />
    </div>
  )
}
