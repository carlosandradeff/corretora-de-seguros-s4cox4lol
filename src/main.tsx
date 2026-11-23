/* Main entry point for the application - renders the root React component */
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'

// @skip-protected: Do not remove. Required for React rendering.
const rootElement = document.getElementById('root')!

// Páginas pré-renderizadas já trazem o HTML dentro de #root: hidrata em vez de recriar.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />)
} else {
  createRoot(rootElement).render(<App />)
}
