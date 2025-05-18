
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider1 } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
   <Provider1>
        <App />
    </Provider1>
</BrowserRouter>
 
)
