import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [isPayersOpen, setIsPayersOpen] = useState(false);
  const [isEhrOpen, setIsEhrOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  
  // Timeout refs for delay
  const servicesTimeout = useRef(null);
  const specialtiesTimeout = useRef(null);
  const payersTimeout = useRef(null);
  const ehrTimeout = useRef(null);
  const resourcesTimeout = useRef(null);
  const companyTimeout = useRef(null);
  
  const location = useLocation();

  // Clear all timeouts on unmount
  useEffect(() => {
    return () => {
      if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
      if (specialtiesTimeout.current) clearTimeout(specialtiesTimeout.current);
      if (payersTimeout.current) clearTimeout(payersTimeout.current);
      if (ehrTimeout.current) clearTimeout(ehrTimeout.current);
      if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
      if (companyTimeout.current) clearTimeout(companyTimeout.current);
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { path: '/services/rcm', label: 'Revenue Cycle Management' },
    { path: '/services/coding', label: 'Medical Coding' },
    { path: '/services/ar-management', label: 'AR Management' },
    { path: '/services/credentialing', label: 'Provider Credentialing' },
    { path: '/services/denial-management', label: 'Denial Management' },
    { path: '/services/telehealth', label: 'Telehealth Billing' },
  ];

  const specialtyLinks = [
    { path: '/specialties/cardiology', label: 'Cardiology' },
    { path: '/specialties/orthopedics', label: 'Orthopedics' },
    { path: '/specialties/neurology', label: 'Neurology' },
    { path: '/specialties/primary-care', label: 'Primary Care' },
    { path: '/specialties/pediatrics', label: 'Pediatrics' },
    { path: '/specialties/ophthalmology', label: 'Ophthalmology' },
    { path: '/specialties/dermatology', label: 'Dermatology' },
    { path: '/specialties/urology', label: 'Urology' },
    { path: '/specialties/gastroenterology', label: 'Gastroenterology' },
    { path: '/specialties/oncology', label: 'Oncology' },
    { path: '/specialties/radiology', label: 'Radiology' },
    { path: '/specialties/anesthesiology', label: 'Anesthesiology' },
    { path: '/specialties/psychiatry', label: 'Psychiatry' },
    { path: '/specialties/pulmonology', label: 'Pulmonology' },
    { path: '/specialties/nephrology', label: 'Nephrology' },
  ];

  const payerLinks = [
    { path: '/payers/medicare', label: 'Medicare' },
    { path: '/payers/medicaid', label: 'Medicaid' },
    { path: '/payers/blue-cross', label: 'Blue Cross Blue Shield' },
    { path: '/payers/united-healthcare', label: 'UnitedHealthcare' },
    { path: '/payers/aetna', label: 'Aetna' },
    { path: '/payers/cigna', label: 'Cigna' },
    { path: '/payers/humana', label: 'Humana' },
    { path: '/payers/tricare', label: 'Tricare' },
    { path: '/payers/workers-comp', label: 'Workers Compensation' },
    { path: '/payers/commercial', label: 'Commercial Insurance' },
  ];

  const ehrLinks = [
    { path: '/ehr/epic', label: 'Epic' },
    { path: '/ehr/cerner', label: 'Cerner' },
    { path: '/ehr/eclinicalworks', label: 'eClinicalWorks' },
    { path: '/ehr/athenahealth', label: 'Athenahealth' },
    { path: '/ehr/nextgen', label: 'NextGen' },
    { path: '/ehr/kareo', label: 'Kareo' },
    { path: '/ehr/practice-fusion', label: 'Practice Fusion' },
    { path: '/ehr/allscripts', label: 'Allscripts' },
  ];

  const resourceLinks = [
    { path: '/blog', label: 'Blog' },
    { path: '/resources/whitepapers', label: 'Whitepapers' },
    { path: '/resources/webinars', label: 'Webinars' },
    { path: '/resources/faqs', label: 'FAQs' },
    { path: '/resources/glossary', label: 'RCM Glossary' },
    { path: '/resources/hipaa-guide', label: 'HIPAA Compliance Guide' },
    { path: '/resources/coding-updates', label: 'Coding Updates 2025' },
  ];

  const companyLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/company/leadership', label: 'Leadership' },
    { path: '/company/careers', label: 'Careers' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
  ];

  const isActive = (path) => location.pathname === path;
  const isActivePath = (paths) => paths.some(p => location.pathname === p || location.pathname.startsWith(p));

  // Dropdown handlers with delay
  const handleMouseEnter = (setter, timeoutRef) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setter(true);
  };

  const handleMouseLeave = (setter, timeoutRef) => {
    timeoutRef.current = setTimeout(() => {
      setter(false);
    }, 300);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">
                MahaStar
              </div>
              <div className="hidden lg:block text-xs text-gray-600 border-l-2 border-primary pl-2 leading-tight">
                Medical Billing &<br />IT Solutions LLC
              </div>
            </Link>
          </div>

          {/* Desktop Mega Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setIsServicesOpen, servicesTimeout)}
              onMouseLeave={() => handleMouseLeave(setIsServicesOpen, servicesTimeout)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActivePath(['/services']) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Services <ChevronDown size={16} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition text-gray-700"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      to="/services"
                      className="block px-4 py-2.5 text-sm text-primary font-semibold hover:bg-gray-50"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Specialties Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setIsSpecialtiesOpen, specialtiesTimeout)}
              onMouseLeave={() => handleMouseLeave(setIsSpecialtiesOpen, specialtiesTimeout)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActivePath(['/specialties']) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Specialties <ChevronDown size={16} className={`transition-transform ${isSpecialtiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSpecialtiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-96 overflow-y-auto">
                  {specialtyLinks.map((specialty) => (
                    <Link
                      key={specialty.path}
                      to={specialty.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition text-gray-700"
                      onClick={() => setIsSpecialtiesOpen(false)}
                    >
                      {specialty.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Payers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setIsPayersOpen, payersTimeout)}
              onMouseLeave={() => handleMouseLeave(setIsPayersOpen, payersTimeout)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActivePath(['/payers']) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Payers <ChevronDown size={16} className={`transition-transform ${isPayersOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPayersOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {payerLinks.map((payer) => (
                    <Link
                      key={payer.path}
                      to={payer.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition text-gray-700"
                      onClick={() => setIsPayersOpen(false)}
                    >
                      {payer.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* EHR Integrations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setIsEhrOpen, ehrTimeout)}
              onMouseLeave={() => handleMouseLeave(setIsEhrOpen, ehrTimeout)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActivePath(['/ehr']) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                EHR Integrations <ChevronDown size={16} className={`transition-transform ${isEhrOpen ? 'rotate-180' : ''}`} />
              </button>
              {isEhrOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {ehrLinks.map((ehr) => (
                    <Link
                      key={ehr.path}
                      to={ehr.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition text-gray-700"
                      onClick={() => setIsEhrOpen(false)}
                    >
                      {ehr.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setIsResourcesOpen, resourcesTimeout)}
              onMouseLeave={() => handleMouseLeave(setIsResourcesOpen, resourcesTimeout)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActivePath(['/blog', '/resources']) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Resources <ChevronDown size={16} className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {resourceLinks.map((resource) => (
                    <Link
                      key={resource.path}
                      to={resource.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition text-gray-700"
                      onClick={() => setIsResourcesOpen(false)}
                    >
                      {resource.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setIsCompanyOpen, companyTimeout)}
              onMouseLeave={() => handleMouseLeave(setIsCompanyOpen, companyTimeout)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActivePath(['/about', '/company']) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Company <ChevronDown size={16} className={`transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCompanyOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {companyLinks.map((company) => (
                    <Link
                      key={company.path}
                      to={company.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition text-gray-700"
                      onClick={() => setIsCompanyOpen(false)}
                    >
                      {company.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.filter(l => l.path !== '/').map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path) ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 border-l border-gray-300 pl-6">
              <a href="https://facebook.com/mahastar" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com/mahastar" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="https://linkedin.com/company/mahastar" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
            
            <Link to="/contact" className="btn-primary py-2 px-4">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button - same as before */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-primary focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - keep your existing mobile menu code */}
        {isOpen && (
          <div className="md:hidden pb-4 max-h-[80vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              
              {/* Mobile Services */}
              <div>
                <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  Services <ChevronDown size={18} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {serviceLinks.map((service) => (
                      <Link key={service.path} to={service.path} className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        {service.label}
                      </Link>
                    ))}
                    <Link to="/services" className="block px-3 py-2 rounded-md text-sm text-primary font-semibold" onClick={() => setIsOpen(false)}>
                      View All Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Specialties */}
              <div>
                <button onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  Specialties <ChevronDown size={18} className={`transition-transform ${isSpecialtiesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSpecialtiesOpen && (
                  <div className="pl-4 space-y-1 mt-1 max-h-48 overflow-y-auto">
                    {specialtyLinks.map((specialty) => (
                      <Link key={specialty.path} to={specialty.path} className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        {specialty.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Payers */}
              <div>
                <button onClick={() => setIsPayersOpen(!isPayersOpen)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  Payers <ChevronDown size={18} className={`transition-transform ${isPayersOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPayersOpen && (
                  <div className="pl-4 space-y-1 mt-1 max-h-48 overflow-y-auto">
                    {payerLinks.map((payer) => (
                      <Link key={payer.path} to={payer.path} className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        {payer.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile EHR */}
              <div>
                <button onClick={() => setIsEhrOpen(!isEhrOpen)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  EHR Integrations <ChevronDown size={18} className={`transition-transform ${isEhrOpen ? 'rotate-180' : ''}`} />
                </button>
                {isEhrOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {ehrLinks.map((ehr) => (
                      <Link key={ehr.path} to={ehr.path} className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        {ehr.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Resources */}
              <div>
                <button onClick={() => setIsResourcesOpen(!isResourcesOpen)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  Resources <ChevronDown size={18} className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isResourcesOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {resourceLinks.map((resource) => (
                      <Link key={resource.path} to={resource.path} className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        {resource.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Company */}
              <div>
                <button onClick={() => setIsCompanyOpen(!isCompanyOpen)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  Company <ChevronDown size={18} className={`transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCompanyOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {companyLinks.map((company) => (
                      <Link key={company.path} to={company.path} className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        {company.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              
              <Link to="/case-studies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                Case Studies
              </Link>
              
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-secondary text-center" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;