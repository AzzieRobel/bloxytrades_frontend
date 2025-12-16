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
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              path="/market"
              element={
                <RequireAuth>
                  <Market />
                </RequireAuth>
              }
            />
            <Route
              path="/seller-dashboard"
              element={
                <RequireAuth>
                  <SellerDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/affiliate"
              element={
                <RequireAuth>
                  <AffiliatePage />
                </RequireAuth>
              }
            />
            <Route
              path="/claims"
              element={
                <RequireAuth>
                  <ClaimsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/contact"
              element={
                <RequireAuth>
                  <ContactPage />
                </RequireAuth>
              }
            />
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
