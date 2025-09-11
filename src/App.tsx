import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/auth/AuthGuard';
import AuthPage from '@/pages/auth/AuthPage';
import PublicPortfolio from '@/pages/portfolio/PublicPortfolio';
import DashboardProfile from '@/pages/dashboard/DashboardProfile';
import LandingPage from '@/pages/LandingPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route path="/portfolio/:username" element={<PublicPortfolio />} />
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard>
              <DashboardProfile />
            </AuthGuard>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;