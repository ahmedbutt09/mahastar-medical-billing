import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { trackPageView } from './utils/analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

// NEW: Dynamic page component (replaces all individual service/specialty/payer/ehr pages)
import DynamicPage from './pages/DynamicPage';

// Keep these listing pages (they show all items, not individual pages)
import Payers from './pages/Payers';
import Specialties from './pages/Specialties';
import Resources from './pages/Resources';

// Keep these static pages (unique layouts that don't fit the dynamic pattern)
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

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          
          {/* Listing pages */}
          <Route path="/payers" element={<Payers />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* DYNAMIC ROUTES - These replace 50+ individual page routes */}
          {/* Services dynamic pages: /services/coding, /services/ar-management, /services/credentialing */}
          <Route path="/services/:slug" element={<DynamicPage />} />
          
          {/* Specialties dynamic pages: /specialties/cardiology, /specialties/orthopedics, etc. */}
          <Route path="/specialties/:slug" element={<DynamicPage />} />
          
          {/* Payers dynamic pages: /payers/medicare, /payers/medicaid, etc. */}
          <Route path="/payers/:slug" element={<DynamicPage />} />
          
          {/* EHR dynamic pages: /ehr/epic, /ehr/cerner, etc. */}
          <Route path="/ehr/:slug" element={<DynamicPage />} />
          
          {/* Static unique pages (keep as-is) */}
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
          
          {/* Fallback route for any other dynamic pages */}
          <Route path="/:type/:slug" element={<DynamicPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
      <ChatBot />
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