import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { GlobalContextProvider } from './contexts/context';
import MainLayout from './layouts/MainLayout';
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
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/market" element={<Market />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />
              <Route path="/claims" element={<ClaimsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
