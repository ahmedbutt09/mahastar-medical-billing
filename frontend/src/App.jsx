import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { trackPageView } from './utils/analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import CaseStudies from './pages/CaseStudies';
import DynamicPage from './pages/DynamicPage';
import ResourcePage from './pages/ResourcePage';
// Listing pages
import Payers from './pages/Payers';
import Specialties from './pages/Specialties';
import Resources from './pages/Resources';

// Static pages (unique layouts)
import AISolutions from './pages/ai/AISolutions';
import Leadership from './pages/company/Leadership';
import Careers from './pages/company/Careers';
import PrivacyPolicy from './pages/company/PrivacyPolicy';
import ForHospitals from './pages/audience/ForHospitals';
import ForMedicalGroups from './pages/audience/ForMedicalGroups';
import ForIndependentPractices from './pages/audience/ForIndependentPractices';
import ForInHouseTeams from './pages/audience/ForInHouseTeams';
import ChatBot from './components/ChatBot';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  // Logic to check if the current page is an admin page
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Only show Navbar if we are NOT on an admin page */}
      {!isAdminPath && <Navbar />}
      
      {/* 2. Remove flex-grow logic for Admin to prevent scroll bugs */}
      <main className={isAdminPath ? "flex-1" : "flex-grow"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          
          {/* Listing pages */}
          <Route path="/payers" element={<Payers />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* Dynamic routes - content from database */}
          <Route path="/services/:slug" element={<DynamicPage />} />
          <Route path="/specialties/:slug" element={<DynamicPage />} />
          <Route path="/payers/:slug" element={<DynamicPage />} />
          <Route path="/ehr/:slug" element={<DynamicPage />} />
          <Route path="/software/:slug" element={<DynamicPage />} />
          <Route path="/automation/:slug" element={<DynamicPage />} />
          <Route path="/solutions/:slug" element={<DynamicPage />} />
          <Route path="/audience/:slug" element={<DynamicPage />} />
          <Route path="/resources/:type" element={<ResourcePage />} />
          {/* Static unique pages */}
         
          
          <Route path="/company/leadership" element={<Leadership />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      {/* 3. Hide Footer and ChatBot on Admin pages */}
      {!isAdminPath && <Footer />}
      {!isAdminPath && <ChatBot />}
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;