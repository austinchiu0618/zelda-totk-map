import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'

import 'leaflet/dist/leaflet.css'
import '@/styles/style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
