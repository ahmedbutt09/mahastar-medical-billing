import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Video, Calendar, BookOpen, HelpCircle, Book, 
  Shield, AlertCircle, Download, Play, CheckCircle, Search, 
  ChevronDown, ChevronUp, MapPin, Clock, Users, X, Eye
} from 'lucide-react';
import api from '../api';

const ResourcePage = () => {
  const { type } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', practice: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchResources();
  }, [type]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/resources/${type}`);
      if (response.data.success) {
        setResources(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (e) => {
  e.preventDefault();
  
  // Determine the URL to open (prefer file_url, then pdf_url)
  const downloadUrl = selectedResource.file_url || selectedResource.pdf_url;
  
  if (!downloadUrl) {
    alert('Error: PDF URL not found. Please contact support.');
    return;
  }
  
  try {
    // Track download in database
    await api.post(`/api/resource/${selectedResource.id}/download`, {
      name: formData.name,
      email: formData.email,
      practice: formData.practice,
      resource_type: selectedResource.resource_type
    });
    
    alert(`Thank you ${formData.name}! The ${selectedResource.title} will open in a new tab.`);
    
    // Open PDF in new tab
    window.open(downloadUrl, '_blank');
    
    // Reset form and close modal
    setFormData({ name: '', email: '', practice: '' });
    setShowModal(false);
    setSelectedResource(null);
    
  } catch (error) {
    console.error('Download error:', error);
    // Still try to open the PDF even if tracking fails
    window.open(downloadUrl, '_blank');
    setShowModal(false);
    setSelectedResource(null);
  }
};
const openDownloadModal = (resource) => {
  console.log('Opening modal for resource:', resource);
  setSelectedResource(resource);
  setShowModal(true);
};

  const getIcon = () => {
    switch(type) {
      case 'whitepapers': return <FileText className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'webinars': return <Video className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'events': return <Calendar className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'magazine': return <BookOpen className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'faqs': return <HelpCircle className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'glossary': return <Book className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'hipaa-guide': return <Shield className="w-20 h-20 mx-auto mb-6 text-accent" />;
      case 'coding-updates': return <AlertCircle className="w-20 h-20 mx-auto mb-6 text-accent" />;
      default: return <FileText className="w-20 h-20 mx-auto mb-6 text-accent" />;
    }
  };

  const getTitle = () => {
    switch(type) {
      case 'whitepapers': return 'Whitepapers & Research';
      case 'webinars': return 'Live & On-Demand Webinars';
      case 'events': return 'Upcoming Events';
      case 'magazine': return 'RCM Magazine';
      case 'faqs': return 'Frequently Asked Questions';
      case 'glossary': return 'RCM Glossary';
      case 'hipaa-guide': return 'HIPAA Compliance Guide';
      case 'coding-updates': return 'Coding Updates 2025';
      default: return 'Resources';
    }
  };

  const getSubtitle = () => {
    switch(type) {
      case 'whitepapers': return 'In-depth research and guides to optimize your medical billing operations.';
      case 'webinars': return 'Expert-led sessions on medical billing, coding, and RCM best practices.';
      case 'events': return 'Join us at industry conferences, webinars, and workshops.';
      case 'magazine': return 'Quarterly publication with industry insights and best practices.';
      case 'faqs': return 'Find answers to common questions about our medical billing services.';
      case 'glossary': return 'Comprehensive guide to Revenue Cycle Management terminology.';
      case 'hipaa-guide': return 'Complete guide to HIPAA compliance for healthcare providers.';
      case 'coding-updates': return 'Stay current with CPT, ICD-10, and HCPCS coding changes.';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ============ WHITEPAPERS ============
  if (type === 'whitepapers') {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {resources.map((wp) => (
                  <div key={wp.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{wp.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-2">{wp.title}</h3>
                        <p className="text-gray-600 mb-3">{wp.description}</p>
                        <div className="text-sm text-gray-500">{wp.pages} pages</div>
                      </div>
                      <button
                        onClick={() => openDownloadModal(wp)}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2"
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-6 h-fit sticky top-24">
                <h3 className="text-xl font-bold mb-4">All Whitepapers Include</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Actionable implementation steps</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Real-world case examples</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />ROI calculators and templates</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Compliance checklists</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Quarterly updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-white py-16 text-center">
          <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block hover:bg-secondary transition">
            Request Custom Research
          </Link>
        </section>
      </div>
    );
  }

  // ============ WEBINARS ============
  if (type === 'webinars') {
    const upcoming = resources.filter(w => w.webinar_status === 'upcoming');
    const recorded = resources.filter(w => w.webinar_status === 'recorded');
    
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {upcoming.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-dark mb-8">Upcoming Webinars</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {upcoming.map(webinar => (
                    <div key={webinar.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">LIVE</span>
                        <span className="text-gray-400 text-xs">{webinar.webinar_date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                      <p className="text-gray-600 mb-3">{webinar.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Clock size={14} />{webinar.duration} min</span>
                        <span className="flex items-center gap-1"><Users size={14} />{webinar.speaker}</span>
                      </div>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                        Register Now →
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {recorded.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-dark mb-8">Recorded Webinars</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {recorded.map(webinar => (
                    <div key={webinar.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{webinar.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{webinar.speaker}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>{webinar.webinar_date}</span>
                            <span>{webinar.duration} min</span>
                          </div>
                          <button className="text-primary font-medium mt-3 hover:underline flex items-center gap-1">
                            Watch Recording → <Eye size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="bg-primary text-white py-16 text-center">
          <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block hover:bg-secondary transition">
            Suggest a Webinar Topic
          </Link>
        </section>
      </div>
    );
  }

  // ============ EVENTS ============
  if (type === 'events') {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            {resources.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg transition">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-3">
                      {event.event_type}
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={14} />{event.event_date}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} />{event.location}</span>
                    </div>
                  </div>
                  <Link 
                    to={event.registration_link || '/contact'} 
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition whitespace-nowrap"
                  >
                    Register →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ============ MAGAZINE ============
  if (type === 'magazine') {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map(issue => (
                <div key={issue.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 h-48 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-primary" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark mb-2">{issue.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{issue.article_count} articles</span>
                      <button 
                        onClick={() => openDownloadModal(issue)}
                        className="text-primary font-semibold hover:underline flex items-center gap-1"
                      >
                        Read Issue → <Eye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============ FAQS ============
  if (type === 'faqs') {
    const categories = [...new Set(resources.map(f => f.faq_category))];
    const filteredFaqs = resources.filter(faq => 
      faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary"
              />
            </div>

            {categories.map(category => {
              const categoryFaqs = filteredFaqs.filter(f => f.faq_category === category);
              if (categoryFaqs.length === 0) return null;
              
              return (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold text-dark mb-4">{category}</h2>
                  <div className="space-y-3">
                    {categoryFaqs.map((faq) => {
                      const isOpen = openFaq === faq.id;
                      return (
                        <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                            className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition"
                          >
                            <span className="font-semibold text-dark">{faq.question}</span>
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          {isOpen && (
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="bg-primary/10 rounded-xl p-8 text-center mt-8">
              <h3 className="text-xl font-bold text-dark mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">Our team is here to help you find the answers you need.</p>
              <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-lg inline-block hover:bg-secondary transition">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============ GLOSSARY ============
  if (type === 'glossary') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const filteredTerms = resources.filter(term =>
      term.term?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const termsByLetter = (letter) => {
      return filteredTerms.filter(term => term.letter === letter);
    };

    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search glossary terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {letters.map(letter => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    selectedLetter === letter
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {termsByLetter(selectedLetter).map((term) => (
                <div key={term.id} className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-dark mb-2">{term.term}</h3>
                  <p className="text-gray-600">{term.definition}</p>
                </div>
              ))}
              {termsByLetter(selectedLetter).length === 0 && (
                <p className="text-center text-gray-500 py-8">No terms found for letter {selectedLetter}.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

// ============ HIPAA COMPLIANCE GUIDE ============
if (type === 'hipaa-guide') {
  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {getIcon()}
          <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {resources.map(guide => (
            <div key={guide.id}>
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-dark mb-4">Your HIPAA Compliance Partner</h2>
                <p className="text-gray-700 mb-4">
                  MahaStar is fully HIPAA compliant, SOC2 Type II audited, and VAPT certified. 
                  We sign Business Associate Agreements (BAA) with all clients and maintain 
                  enterprise-grade security controls.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                    <Shield className="w-4 h-4 text-primary" /> HIPAA Compliant
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                    <Shield className="w-4 h-4 text-primary" /> SOC2 Type II
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                    <Shield className="w-4 h-4 text-primary" /> VAPT Audited
                  </span>
                </div>
              </div>

              <div 
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: guide.content || '' }}
              />

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold text-dark mb-2">Download Full Compliance Guide</h3>
                <p className="text-gray-600 mb-4">Get our complete 24-page HIPAA compliance guide for medical practices.</p>
                {/* Debug info - remove after testing */}
                <p className="text-xs text-gray-400 mb-2">PDF URL: {guide.file_url || 'Not set'}</p>
                <button 
                  onClick={() => {
                    console.log('Guide data:', guide);
                    openDownloadModal(guide);
                  }}
                  className="bg-primary text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-secondary transition"
                >
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block hover:bg-secondary transition">
          Request Compliance Consultation
        </Link>
      </section>
    </div>
  );
}

  // ============ CODING UPDATES ============
  if (type === 'coding-updates') {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {getIcon()}
            <h1 className="text-5xl font-bold mb-4">{getTitle()}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{getSubtitle()}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            {resources.map(update => (
              <div key={update.id}>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8 rounded-r-xl">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-yellow-600" />
                    <span className="font-semibold">Effective January 1, 2025</span>
                  </div>
                  <p className="text-gray-700 mt-2">All providers must implement these coding changes to ensure accurate reimbursement.</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold text-dark mb-4">{update.title}</h2>
                  <p className="text-gray-600 mb-4">Category: <span className="font-semibold">{update.category}</span></p>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: update.content || '' }}
                  />
                </div>

                <div className="bg-primary/10 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-dark mb-2">Need Help Implementing Coding Updates?</h3>
                  <p className="text-gray-600 mb-4">Our coding specialists ensure 99.2% accuracy with all 2025 changes.</p>
                  <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-lg inline-block hover:bg-secondary transition">
                    Schedule Coding Audit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Download Modal
  return (
    <>
      {showModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-dark">Download {selectedResource.title}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleDownload}>
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:ring-primary focus:border-primary"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:ring-primary focus:border-primary"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="text"
                placeholder="Practice Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-primary focus:border-primary"
                value={formData.practice}
                onChange={(e) => setFormData({...formData, practice: e.target.value})}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
              >
                Download Now
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full text-gray-500 mt-2 hover:text-gray-700"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourcePage;