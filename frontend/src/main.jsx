import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UsersGrid from './pages/UsersGrid'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersGrid />
  </StrictMode>,
)
