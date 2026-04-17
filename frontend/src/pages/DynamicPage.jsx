import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { 
  Award, TrendingUp, Shield, Clock, CheckCircle, Activity,
  Users, BarChart3, Target, AlertCircle, RefreshCw, Brain,
  Eye, Heart, Database, FileCheck, Building2, Loader
} from 'lucide-react';
import api from '../api';

const iconMap = {
  Award, TrendingUp, Shield, Clock, CheckCircle, Activity,
  Users, BarChart3, Target, AlertCircle, RefreshCw, Brain,
  Eye, Heart, Database, FileCheck, Building2
};

const DynamicPage = () => {
  const { type: paramType, slug: paramSlug } = useParams();
  const location = useLocation();
  
  // Determine the actual type from the URL path
  const getTypeFromPath = () => {
    const path = location.pathname;
    if (path.startsWith('/services/')) return 'services';
    if (path.startsWith('/specialties/')) return 'specialties';
    if (path.startsWith('/payers/')) return 'payers';
    if (path.startsWith('/ehr/')) return 'ehr';
    return paramType; // Fallback to param if available
  };
  
  const type = getTypeFromPath();
  const slug = paramSlug;
  
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    phone: ''
  });

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      setError(null);
      
      console.log('🔍 DynamicPage mounted with:', { type, slug, path: location.pathname });
      console.log('📡 API Base URL:', api.defaults.baseURL);
      
      if (!type || !slug) {
        console.error('Missing type or slug');
        setError('Invalid page parameters');
        setLoading(false);
        return;
      }
      
      try {
        const url = `/api/dynamic-page/${type}/${slug}`;
        console.log(`📤 Fetching: ${url}`);
        
        const response = await api.get(url);
        
        console.log('📥 Response:', response.data);
        
        if (response.data.success && response.data.data) {
          setPageData(response.data.data);
          console.log('✅ Page data loaded:', response.data.data.page_title);
        } else {
          setError('Page not found in database');
        }
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load page');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageData();
  }, [type, slug, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/contact', {
        ...formData,
        subject: `Inquiry about ${pageData?.page_title || slug}`,
        message: `Interested in ${pageData?.page_title || slug} services`
      });
      alert('Thank you! A specialist will contact you within 24 hours.');
      setFormData({ name: '', email: '', practice: '', phone: '' });
    } catch (error) {
      alert('Error submitting form. Please try again or call us directly.');
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Page Error</h1>
          <p className="text-gray-600 mb-2">Type: {type}</p>
          <p className="text-gray-600 mb-4">Slug: {slug}</p>
          <p className="text-gray-600 mb-6">{error || 'Page not found'}</p>
          <Link to="/" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Parse JSON fields (handle both string and parsed)
  const stats = Array.isArray(pageData.stats) ? pageData.stats : (pageData.stats ? JSON.parse(pageData.stats) : []);
  const features = Array.isArray(pageData.features) ? pageData.features : (pageData.features ? JSON.parse(pageData.features) : []);
  const itemsList = Array.isArray(pageData.items_list) ? pageData.items_list : (pageData.items_list ? JSON.parse(pageData.items_list) : []);
  const processSteps = Array.isArray(pageData.process_steps) ? pageData.process_steps : (pageData.process_steps ? JSON.parse(pageData.process_steps) : []);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageData.hero_title || pageData.page_title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {pageData.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">
                {pageData.main_title}
              </h2>
              
              {/* Rich Content */}
              {pageData.content && (
                <div 
                  className="prose prose-lg max-w-none text-gray-600 mb-8"
                  dangerouslySetInnerHTML={{ __html: pageData.content }}
                />
              )}

              {/* Features Grid */}
              {features.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-dark mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {features.map((feature, idx) => {
                      const IconComponent = iconMap[feature.icon] || CheckCircle;
                      return (
                        <div key={idx} className="flex gap-3">
                          <IconComponent className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-dark">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Items List */}
              {itemsList.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-dark mb-4">
                    {pageData.page_type === 'specialties' ? 'Conditions & Procedures We Treat' : 
                     pageData.page_type === 'payers' ? 'Coverage Types' :
                     'Services We Provide'}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {itemsList.map((item, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Process Steps */}
              {processSteps.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-dark text-lg mb-4">
                    {pageData.page_type === 'services' ? 'Our Process' : 'How We Help'}
                  </h4>
                  <ol className="space-y-4">
                    {processSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 sticky top-24">
                <h3 className="text-xl font-bold text-dark mb-4">
                  {pageData.form_title || 'Request Information'}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {pageData.form_subtitle || 'Our specialist will contact you within 24 hours.'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                      placeholder="john@practice.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Practice Name</label>
                    <input
                      type="text"
                      value={formData.practice}
                      onChange={(e) => setFormData({...formData, practice: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                      placeholder="Practice Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                  >
                    {pageData.button_text || 'Submit Request →'}
                  </button>
                </form>
                <p className="text-xs text-gray-500 text-center mt-4">
                  {pageData.footer_note || 'Free, no-obligation consultation'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {(pageData.cta_title || pageData.cta_text) && (
        <section className="bg-primary text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
              {pageData.cta_title || 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              {pageData.cta_text || 'Contact us today for a free consultation'}
            </p>
            <Link 
              to={pageData.cta_link || '/contact'} 
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition inline-block"
            >
              {pageData.cta_button || 'Contact Us Today'}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default DynamicPage;