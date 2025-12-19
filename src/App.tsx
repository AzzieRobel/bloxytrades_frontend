import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { GlobalContextProvider } from './contexts/context';
import { AuthModalProvider } from './contexts/AuthModalContext';
import MainLayout from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/home';
import Market from './pages/market';
import SellerDashboard from './pages/sellerDashboard';
import ProfilePage from './pages/profile';
import AffiliatePage from './pages/affiliate';
import ClaimsPage from './pages/claims';
import ContactPage from './pages/contact';

function App() {
  return (
    <GlobalContextProvider>
      <AuthModalProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
                <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/affiliate" element={<ProtectedRoute><AffiliatePage /></ProtectedRoute>} />
                <Route path="/claims" element={<ProtectedRoute><ClaimsPage /></ProtectedRoute>} />
                <Route path="/contact" element={<ContactPage />} />
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthModalProvider>
    </GlobalContextProvider>
  );
}

export default App;
