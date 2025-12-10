import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import MainLayout from './layouts/MainLayout';
import Market from './pages/market';
import SellerDashboard from './pages/sellerDashboard';
import ProfilePage from './pages/profile';
import AffiliatePage from './pages/affiliate';
import ClaimsPage from './pages/claims';
import ContactPage from './pages/contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path='/market' element={<Market />} />
            <Route path='/seller-dashboard' element={<SellerDashboard />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/affiliate' element={<AffiliatePage />} />
            <Route path='/claims' element={<ClaimsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
