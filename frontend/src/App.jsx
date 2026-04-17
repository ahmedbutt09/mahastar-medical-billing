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
import RCMSoftware from './pages/software/RCMSoftware';
import RCMServices from './pages/automation/RCMServices';
import Events from './pages/resources/Events';
import Magazine from './pages/resources/Magazine';
import Whitepapers from './pages/resources/Whitepapers';
import Webinars from './pages/resources/Webinars';
import FAQs from './pages/resources/FAQs';
import RCMGlossary from './pages/resources/RCMGlossary';
import HIPAAComplianceGuide from './pages/resources/HIPAAComplianceGuide';
import CodingUpdates2025 from './pages/resources/CodingUpdates2025';
import Leadership from './pages/company/Leadership';
import Careers from './pages/company/Careers';
import PrivacyPolicy from './pages/company/PrivacyPolicy';
import ForHospitals from './pages/audience/ForHospitals';
import ForMedicalGroups from './pages/audience/ForMedicalGroups';
import ForIndependentPractices from './pages/audience/ForIndependentPractices';
import ForInHouseTeams from './pages/audience/ForInHouseTeams';
import ChatBot from './components/ChatBot';

// Main website layout component (with Navbar and Footer)
const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          
          <Route path="/payers" element={<Payers />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/resources" element={<Resources />} />
          
          <Route path="/services/:slug" element={<DynamicPage />} />
          <Route path="/specialties/:slug" element={<DynamicPage />} />
          <Route path="/payers/:slug" element={<DynamicPage />} />
          <Route path="/ehr/:slug" element={<DynamicPage />} />
          <Route path="/software/:slug" element={<DynamicPage />} />
          <Route path="/automation/:slug" element={<DynamicPage />} />
          <Route path="/solutions/:slug" element={<DynamicPage />} />
          <Route path="/audience/:slug" element={<DynamicPage />} />
          
          <Route path="/resources/:type" element={<ResourcePage />} />
          
          <Route path="/ai-solutions" element={<AISolutions />} />
          <Route path="/rcm-software" element={<RCMSoftware />} />
          <Route path="/rcm-automation" element={<RCMServices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/resources/whitepapers" element={<Whitepapers />} />
          <Route path="/resources/webinars" element={<Webinars />} />
          <Route path="/resources/faqs" element={<FAQs />} />
          <Route path="/resources/glossary" element={<RCMGlossary />} />
          <Route path="/resources/hipaa-guide" element={<HIPAAComplianceGuide />} />
          <Route path="/resources/coding-updates" element={<CodingUpdates2025 />} />
          <Route path="/company/leadership" element={<Leadership />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/for-hospitals" element={<ForHospitals />} />
          <Route path="/for-medical-groups" element={<ForMedicalGroups />} />
          <Route path="/for-independent-practices" element={<ForIndependentPractices />} />
          <Route path="/for-in-house-teams" element={<ForInHouseTeams />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
      <ChatBot />
    </div>
  );
};

// Admin layout component (NO Navbar, NO Footer - completely separate)
const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin routes - completely separate, no navbar/footer */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Main website routes - with navbar/footer */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;