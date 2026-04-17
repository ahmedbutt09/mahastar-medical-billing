import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (dropdown) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const isActive = (path) => location.pathname === path;

  // Dropdown data
  const menuItems = {
    services: {
      title: 'Services',
      links: [
        { path: '/services/rcm', label: 'Revenue Cycle Management' },
        { path: '/services/coding', label: 'Medical Coding' },
        { path: '/services/ar-management', label: 'AR Management' },
        { path: '/services/credentialing', label: 'Provider Credentialing' },
        { path: '/services/denial-management', label: 'Denial Management' },
        { path: '/services/telehealth', label: 'Telehealth Billing' },
        // Software & Automation
  { path: '/software/rcm-software', label: 'RCM Software' },
  { path: '/automation/rcm-automation', label: 'RCM Automation' },
        { path: '/ai-solutions', label: 'AI Solutions' },
      ]
    },
    solutions: {
      title: 'Solutions',
      links: [
        { path: '/for-hospitals', label: 'For Hospitals' },
        { path: '/for-medical-groups', label: 'For Medical Groups' },
        { path: '/for-independent-practices', label: 'For Independent Practices' },
        { path: '/for-in-house-teams', label: 'For In-House Teams' },
      ]
    },
    specialties: {
      title: 'Specialties',
      links: [
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
      ]
    },
    payers: {
      title: 'Payers',
      links: [
        { path: '/payers/medicare', label: 'Medicare' },
        { path: '/payers/medicaid', label: 'Medicaid' },
        { path: '/payers/blue-cross', label: 'Blue Cross Blue Shield' },
        { path: '/payers/united-healthcare', label: 'UnitedHealthcare' },
        { path: '/payers/aetna', label: 'Aetna' },
        { path: '/payers/cigna', label: 'Cigna' },
        { path: '/payers/humana', label: 'Humana' },
        { path: '/payers/tricare', label: 'Tricare' },
        { path: '/payers/workers-comp', label: 'Workers Comp' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { path: '/blog', label: 'Blog' },
        { path: '/resources/whitepapers', label: 'Whitepapers' },
        { path: '/resources/webinars', label: 'Webinars' },
        { path: '/resources/faqs', label: 'FAQs' },
        { path: '/resources/glossary', label: 'RCM Glossary' },
        { path: '/events', label: 'Events' },
        { path: '/magazine', label: 'Magazine' },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { path: '/about', label: 'About Us' },
        { path: '/company/leadership', label: 'Leadership' },
        { path: '/company/careers', label: 'Careers' },
        { path: '/contact', label: 'Contact' },
        { path: '/privacy-policy', label: 'Privacy Policy' },
      ]
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">MahaStar</div>
            <div className="text-xs text-gray-500 hidden sm:block">Medical Billing & IT Solutions</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Home
            </Link>

            {Object.entries(menuItems).map(([key, item]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md transition flex items-center gap-1 ${
                    activeDropdown === key ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.title} <ChevronDown size={14} className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === key && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {item.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link to="/pricing" className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive('/pricing') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Pricing
            </Link>

            <Link to="/case-studies" className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive('/case-studies') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Case Studies
            </Link>

            {/* Phone Number */}
            <div className="ml-4 flex items-center gap-2 text-gray-600">
              <Phone size={14} />
              <span className="text-sm font-medium">(555) 123-4567</span>
            </div>

            {/* CTA Button */}
            <Link to="/contact" className="ml-4 bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
              
              {/* Mobile dropdown sections */}
              {Object.entries(menuItems).map(([key, item]) => (
                <div key={key}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md flex justify-between items-center"
                  >
                    {item.title}
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === key && (
                    <div className="pl-4 space-y-1">
                      {item.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link to="/case-studies" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Case Studies</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-secondary rounded-md text-center mt-2" onClick={() => setIsOpen(false)}>Get Started</Link>
              
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-600 py-2">
                  <Phone size={14} />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;