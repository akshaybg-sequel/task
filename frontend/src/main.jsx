import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'   // NEW
import CssBaseline from '@mui/material/CssBaseline'           // NEW
import './index.css'                                          // NEW
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <CssBaseline />
      <App />
    </StyledEngineProvider>
  </StrictMode>,
)
