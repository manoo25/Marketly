import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'


createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
