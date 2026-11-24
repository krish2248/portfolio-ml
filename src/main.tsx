/**
 * Main Entry Point
 * React application bootstrap
 */

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { langFromPath } from './lib/lang'
import './styles/globals.css'

// Get root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find root element. Make sure there is a <div id="root"></div> in your index.html')
}

const app = (
  <StrictMode>
    <App lang={langFromPath(window.location.pathname)} />
  </StrictMode>
)

// Built pages are pre-rendered (scripts/prerender.mjs); the dev server starts from an empty root.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
