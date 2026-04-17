import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Video, Calendar, BookOpen, HelpCircle, Book, 
  Shield, AlertCircle, Download, Play, CheckCircle, Search, 
  ChevronDown, ChevronUp, MapPin, Clock, Users, X
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
    try {
      await api.post(`/api/resource/${selectedResource.id}/download`, {
        name: formData.name,
        email: formData.email,
        practice: formData.practice,
        resource_type: selectedResource.resource_type
      });
      alert(`Thank you! The ${selectedResource.title} will be sent to ${formData.email}`);
      setFormData({ name: '', email: '', practice: '' });
      setShowModal(false);
      setSelectedResource(null);
      
      // Open the actual PDF in new tab
      if (selectedResource.file_url) {
        window.open(selectedResource.file_url, '_blank');
      }
    } catch (error) {
      alert('Error processing request. Please try again.');
    }
  };

  const openDownloadModal = (resource) => {
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

  // Render Whitepapers
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
      </div>
    );
  }

  // Render Webinars
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
                    <div key={webinar.id} className="bg-gray-50 rounded-xl p-6">
                      <Play className="w-4 h-4 text-primary mb-2" />
                      <h3 className="text-lg font-bold mb-1">{webinar.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{webinar.speaker}</p>
                      <p className="text-gray-400 text-xs">{webinar.webinar_date}</p>
                      <button className="text-primary font-medium mt-3 hover:underline">
                        Watch Recording →
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Render Events
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
              <div key={event.id} className="bg-white rounded-xl shadow-md p-6 mb-4">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <div className="text-primary font-bold">{event.event_date}</div>
                    <h3 className="text-xl font-bold text-dark">{event.title}</h3>
                    <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                      <span><MapPin size={14} className="inline mr-1" />{event.location}</span>
                      <span><Users size={14} className="inline mr-1" />{event.event_type}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  </div>
                  <Link to={event.registration_link || '/contact'} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
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

  // Render FAQs
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>

            {categories.map(category => {
              const categoryFaqs = filteredFaqs.filter(f => f.faq_category === category);
              if (categoryFaqs.length === 0) return null;
              
              return (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold text-dark mb-4">{category}</h2>
                  <div className="space-y-3">
                    {categoryFaqs.map((faq, idx) => {
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
          </div>
        </section>
      </div>
    );
  }

  // Render Glossary
  if (type === 'glossary') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const filteredTerms = resources.filter(term =>
      term.term?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search glossary terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
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
              {filteredTerms
                .filter(term => !searchTerm || term.letter === selectedLetter)
                .map((term) => (
                  <div key={term.id} className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-dark mb-2">{term.term}</h3>
                    <p className="text-gray-600">{term.definition}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render Magazine, HIPAA Guide, Coding Updates (simple layout)
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
          {resources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-dark mb-4">{resource.title}</h2>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              {resource.content && (
                <div dangerouslySetInnerHTML={{ __html: resource.content }} className="prose max-w-none" />
              )}
              {resource.file_url && (
                <button
                  onClick={() => openDownloadModal(resource)}
                  className="bg-primary text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 mt-4"
                >
                  <Download size={16} /> Download PDF
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block hover:bg-secondary transition">
          Contact Us for More Information
        </Link>
      </section>
    </div>
  );
};

export default ResourcePage;