
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { initBuilder } from "@/components/builder";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProjects from "./pages/dashboard/Projects";
import NewProject from "./pages/dashboard/NewProject";
import Profile from "./pages/dashboard/Profile";
import Editor from "./pages/dashboard/Editor";
import PublicProfile from "./pages/PublicProfile";
import PublicSite from "./pages/PublicSite";
import NotFound from "./pages/NotFound";

// Initialize Builder.io components
initBuilder();

const queryClient = new QueryClient();

function Protected({ children }: { children: React.ReactNode }) {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Marketing landing page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Demo route for existing template */}
            <Route path="/demo" element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>
            
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Builder.io powered public sites */}
            <Route path="/u/:username" element={<PublicSite />} />
            <Route path="/u/:username/:pageSlug" element={<PublicSite />} />
            
            {/* Legacy public profile (fallback) */}
            <Route path="/profile/:username" element={<PublicProfile />} />
            
            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <Protected>
                <DashboardLayout />
              </Protected>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="projects/new" element={<NewProject />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Protected editor */}
            <Route path="/editor/:pageId" element={
              <Protected>
                <Editor />
              </Protected>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
