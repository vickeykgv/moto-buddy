import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(<App />)

// optional: register service worker helpers
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // you can prompt user to refresh
    console.log('New content available; please refresh.')
  },
  onOfflineReady() {
    console.log('App ready to work offline.')
  }
})
