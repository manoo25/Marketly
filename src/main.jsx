import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './css/global.css';


createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)


createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)
