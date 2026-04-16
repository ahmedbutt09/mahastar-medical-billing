import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import MedicalCoding from './pages/services/MedicalCoding';
import ARManagement from './pages/services/ARManagement';
import Credentialing from './pages/services/Credentialing';
import Cardiology from './pages/specialties/Cardiology';
import Orthopedics from './pages/specialties/Orthopedics';
import Neurology from './pages/specialties/Neurology';
import PrimaryCare from './pages/specialties/PrimaryCare';
import Pediatrics from './pages/specialties/Pediatrics';
import Ophthalmology from './pages/specialties/Ophthalmology';
import Dermatology from './pages/specialties/Dermatology';
import Urology from './pages/specialties/Urology';
import Gastroenterology from './pages/specialties/Gastroenterology';
import Oncology from './pages/specialties/Oncology';
import Radiology from './pages/specialties/Radiology';
import Anesthesiology from './pages/specialties/Anesthesiology';
import Psychiatry from './pages/specialties/Psychiatry';
import Pulmonology from './pages/specialties/Pulmonology';
import Nephrology from './pages/specialties/Nephrology';
import Medicare from './pages/payers/Medicare';
import Medicaid from './pages/payers/Medicaid';
import BlueCross from './pages/payers/BlueCross';
import UnitedHealthcare from './pages/payers/UnitedHealthcare';
import Aetna from './pages/payers/Aetna';
import Cigna from './pages/payers/Cigna';
import Humana from './pages/payers/Humana';
import Tricare from './pages/payers/Tricare';
import WorkersComp from './pages/payers/WorkersComp';
import CommercialInsurance from './pages/payers/CommercialInsurance';
import Epic from './pages/ehr/Epic';
import Cerner from './pages/ehr/Cerner';
import EClinicalWorks from './pages/ehr/EClinicalWorks';
import Athenahealth from './pages/ehr/Athenahealth';
import NextGen from './pages/ehr/NextGen';
import Kareo from './pages/ehr/Kareo';
import PracticeFusion from './pages/ehr/PracticeFusion';
import Allscripts from './pages/ehr/Allscripts';
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
// AI & Software Pages
import AISolutions from './pages/ai/AISolutions';
import RCMSoftware from './pages/software/RCMSoftware';
import RCMServices from './pages/automation/RCMServices';

// Additional Resource Pages
import Events from './pages/resources/Events';
import Magazine from './pages/resources/Magazine';
import Payers from './pages/Payers';
import Specialties from './pages/Specialties';
import Resources from './pages/Resources';
function App() {
  const location = useLocation();

useEffect(() => {
  trackPageView(location.pathname);
}, [location]);
  return (
    
    <Router>
      <ScrollToTop />
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
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/services/coding" element={<MedicalCoding />} />
            <Route path="/services/ar-management" element={<ARManagement />} />
            <Route path="/services/credentialing" element={<Credentialing />} />
            <Route path="/services/rcm" element={<Services />} />
            <Route path="/services/denial-management" element={<Services />} />
            <Route path="/services/telehealth" element={<Services />} />
            <Route path="/specialties/cardiology" element={<Cardiology />} />
            <Route path="/specialties/orthopedics" element={<Orthopedics />} />
            <Route path="/specialties/neurology" element={<Neurology />} />
            <Route path="/specialties/primary-care" element={<PrimaryCare />} />
            <Route path="/specialties/pediatrics" element={<Pediatrics />} />
            <Route path="/specialties/ophthalmology" element={<Ophthalmology />} />
            <Route path="/specialties/dermatology" element={<Dermatology />} />
            <Route path="/specialties/urology" element={<Urology />} />
            <Route path="/specialties/gastroenterology" element={<Gastroenterology />} />
            <Route path="/specialties/oncology" element={<Oncology />} />
            <Route path="/specialties/radiology" element={<Radiology />} />
            <Route path="/specialties/anesthesiology" element={<Anesthesiology />} />
            <Route path="/specialties/psychiatry" element={<Psychiatry />} />
            <Route path="/specialties/pulmonology" element={<Pulmonology />} />
            <Route path="/specialties/nephrology" element={<Nephrology />} />
            <Route path="/payers/medicare" element={<Medicare />} />
            <Route path="/payers/medicaid" element={<Medicaid />} />
            <Route path="/payers/blue-cross" element={<BlueCross />} />
            <Route path="/payers/united-healthcare" element={<UnitedHealthcare />} />
            <Route path="/payers/aetna" element={<Aetna />} />
            <Route path="/payers/cigna" element={<Cigna />} />
            <Route path="/payers/humana" element={<Humana />} />
            <Route path="/payers/tricare" element={<Tricare />} />
            <Route path="/payers/workers-comp" element={<WorkersComp />} />
            <Route path="/payers/commercial" element={<CommercialInsurance />} />
            <Route path="/ehr/epic" element={<Epic />} />
            <Route path="/ehr/cerner" element={<Cerner />} />
            <Route path="/ehr/eclinicalworks" element={<EClinicalWorks />} />
            <Route path="/ehr/athenahealth" element={<Athenahealth />} />
            <Route path="/ehr/nextgen" element={<NextGen />} />
            <Route path="/ehr/kareo" element={<Kareo />} />
            <Route path="/ehr/practice-fusion" element={<PracticeFusion />} />
            <Route path="/ehr/allscripts" element={<Allscripts />} />
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
<Route path="/payers" element={<Payers />} />
<Route path="/specialties" element={<Specialties />} />
<Route path="/resources" element={<Resources />} />
{/* AI & Software Routes */}
<Route path="/ai-solutions" element={<AISolutions />} />
<Route path="/rcm-software" element={<RCMSoftware />} />
<Route path="/rcm-automation" element={<RCMServices />} />

{/* Additional Resource Routes */}
<Route path="/events" element={<Events />} />
<Route path="/magazine" element={<Magazine />} />

          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
<ChatBot />
      </div>
    </Router>
  );
}

export default App;