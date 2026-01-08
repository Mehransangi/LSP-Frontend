import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'
import  {AuthProvider} from './context/auth.jsx'
import ScrollToTop from './components/scrolltothetop';



createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
    <ScrollToTop />
      <App />
    </BrowserRouter>
  </AuthProvider>
)
