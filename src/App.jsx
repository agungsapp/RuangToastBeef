import './App.css';
import Header from './components/Header';
import Transaksi from './pages/Transaksi';
import Ringkasan from './pages/Ringkasan';
import Dashboard from './pages/Dashboard';
import SplashScreen from './pages/SplashScreen';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/ringkasan" element={<Ringkasan />} />
      </Routes>

      {/* Bottom Navigation */}
      <div className="btm-nav fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center py-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `focus:outline-none ${isActive ? 'text-blue-500' : ''}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-sm">Dashboard</span>
        </NavLink>

        <NavLink
          to="/transaksi"
          className={({ isActive }) =>
            `focus:outline-none ${isActive ? 'text-blue-500' : ''}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m-6-8h.01M5 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"
            />
          </svg>
          <span className="text-sm">Transaksi</span>
        </NavLink>


        <NavLink
          to="/ringkasan"
          className={({ isActive }) =>
            `focus:outline-none ${isActive ? 'text-blue-500' : ''}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">Ringkasan</span>
        </NavLink>
      </div>
    </Router>
  );
}

export default App;
