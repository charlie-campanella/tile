/* Third Party Dependencies */
import React from 'react'
import ReactDOM from 'react-dom/client'

/* Local Dependencies */
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)