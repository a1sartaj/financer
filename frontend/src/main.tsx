import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AppContextProvider } from './context/AppContext.jsx';
import { AdminContextProvider } from './context/AdminContext.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
