// Entry point — mounts the React tree and initializes i18n before first render.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/fonts'
import '@/i18n'
import '@/index.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
