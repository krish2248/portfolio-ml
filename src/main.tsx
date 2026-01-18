/**
 * Main Entry Point
 * React application bootstrap
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Get root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find root element. Make sure there is a <div id="root"></div> in your index.html')
}

// Create React root and render app
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
