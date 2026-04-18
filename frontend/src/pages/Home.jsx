import React, { useState, useEffect } from 'react';
import Testimonials from '../components/Testimonials';
import SpecialtyServices from '../components/SpecialtyServices';
import EHRPartners from '../components/EHRPartners';
import NewsPress from '../components/NewsPress';
import RCMProcess from '../components/RCMProcess';
import ClientLogos from '../components/ClientLogos';
import { Link } from 'react-router-dom';
import api from '../api';
import { 
  TrendingUp, Clock, Shield, CheckCircle, DollarSign,
  FileCheck, Activity, Headphones, Zap, Award, BarChart3,
  Building2, ThumbsUp, FileText, PhoneCall, CreditCard,
  Users, Lock, Stethoscope, Heart, Brain
} from 'lucide-react';

const iconMap = {
  TrendingUp: TrendingUp,
  Activity: Activity,
  Shield: Shield,
  DollarSign: DollarSign,
  Headphones: Headphones,
  FileCheck: FileCheck,
  Award: Award,
  BarChart3: BarChart3,
  Clock: Clock,
  Users: Users,
  Lock: Lock,
  Zap: Zap,
  ThumbsUp: ThumbsUp
};

const Home = () => {
  const [homeContent, setHomeContent] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const contentRes = await api.get('/api/page-content/home');
      if (contentRes.data.success) {
        setHomeContent(contentRes.data.data);
      }

      const servicesRes = await api.get('/api/services');
      if (servicesRes.data.success) {
        setServices(servicesRes.data.data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fallbackHeroImage = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200';
  const fallbackDoctorImage = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800';
  const fallbackTeamImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800';

  const metrics = [
    { value: '$250M+', label: 'Annual Claims Processed', icon: BarChart3 },
    { value: '99.2%', label: 'Coding Accuracy Rate', icon: Award },
    { value: '<15 Days', label: 'Average AR Turnaround', icon: Clock },
    { value: '98%', label: 'Client Retention Rate', icon: ThumbsUp },
  ];

  const trustBadges = [
    { icon: Shield, text: 'HIPAA Compliant' },
    { icon: Lock, text: 'SOC2 Type II' },
    { icon: Users, text: '150+ Physician Groups' },
    { icon: Award, text: '15+ Years Avg. Experience' },
  ];

  const pricingModels = [
    { name: 'End-to-End RCM', price: 'Custom', description: 'Full cycle: coding to payment posting', bestFor: '5+ providers', slug: 'end-to-end-rcm' },
    { name: 'Partial RCM', price: 'Custom', description: 'Pick modules (coding + denial only)', bestFor: 'Practices with internal billers', slug: 'partial-rcm' },
    { name: 'Co-Managed', price: 'Hourly', description: 'We augment your team with specialists', bestFor: 'Flexible scaling', slug: 'co-managed' },
    { name: 'FTE Model', price: 'Monthly', description: 'Dedicated offshore team at 60% less cost', bestFor: 'High volume practices', slug: 'fte-model' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Company Branding */}
      <section className="relative bg-gradient-to-br from-dark via-dark to-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={homeContent?.hero_image || fallbackDoctorImage}
            alt="Medical professionals"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent"></div>
        </div>
        <div className="relative z-10 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">
                    {homeContent?.hero_badge || 'Trusted by 150+ Physician Groups'}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {homeContent?.hero_title || 'Enterprise RCM That '}
                  <span className="text-accent">{homeContent?.hero_highlight || 'Actually Increases'} </span>
                  {homeContent?.hero_title_end || 'Your Net Collections'}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  {homeContent?.hero_subtitle || '98% first-pass claim acceptance, 40% faster AR resolution, and full HIPAA/SOC2 compliance.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="bg-accent hover:bg-secondary text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center">
                    📊 Get Your Free RCM Audit →
                  </Link>
                  <Link to="/pricing" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all text-center">
                    💰 See Pricing Models
                  </Link>
                </div>
                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/20">
                  {trustBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <badge.icon className="w-5 h-5 text-accent" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Company Logo & Branding */}
<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
  {/* Your Logo from Supabase */}
  <img 
    src={homeContent?.logo_url || 'https://foqmcizermoatgwknwfc.supabase.co/storage/v1/object/public/images/brand/mahastar-logo.png'}
    alt="MahaStar Medical Billing"
    className="w-48 mx-auto mb-6"
  />
  
  <h2 className="text-2xl font-bold text-white mb-1">
    MahaStar Medical Billing
  </h2>
  <p className="text-accent font-medium mb-4">
    & IT Solutions LLC
  </p>     
                <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-accent">15+</div>
                    <div className="text-xs text-blue-100">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">500+</div>
                    <div className="text-xs text-blue-100">Happy Clients</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>SOC2 Type II Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>99.2% Coding Accuracy</span>
                  </div>
                </div>
                
                <Link 
                  to="/contact" 
                  className="inline-block bg-accent hover:bg-secondary text-white px-6 py-2 rounded-lg transition w-full text-center font-semibold"
                >
                  Schedule Consultation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <metric.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-dark">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">
              {homeContent?.services_title || 'Full Spectrum RCM Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {homeContent?.services_subtitle || 'Gain optimal reimbursement across both payment structures. Mitigate compliance risks. Improve medical coding efficiency.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon_name] || FileCheck;
              // Use the correct dynamic route for services
              const serviceLink = `/services/${service.slug}`;
              return (
                <Link key={index} to={serviceLink} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 block">
                  <IconComponent className="w-14 h-14 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-dark">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="mt-4 text-primary font-medium flex items-center gap-1">
                    Learn More →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor/Team Image Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {homeContent?.about_title || 'Expert Team of Medical Billing Specialists'}
              </h2>
              <p className="text-gray-600 mb-6">
                {homeContent?.about_text || 'Our team of AAPC-certified coders, former practice managers, and RCM experts bring decades of experience to maximize your revenue. We understand the unique challenges of medical practices because we have been in your shoes.'}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>50+ Certified Professional Coders (CPC)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>15+ Years Average Industry Experience</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Specialty-Specific Coding Expertise</span>
                </li>
              </ul>
              <Link to="/company/leadership" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition inline-block">
                Meet Our Team →
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full"></div>
              <img 
                src={homeContent?.team_image || fallbackTeamImage}
                alt="Medical billing team"
                className="rounded-2xl shadow-xl relative z-10 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Models Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">
              {homeContent?.pricing_title || '4 Scalable Pricing Models That Fit Perfectly For Your Practice'}
            </h2>
            <p className="text-xl text-gray-600">
              {homeContent?.pricing_subtitle || 'Choose from 4 scalable RCM pricing models to boost profitability & efficiency'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingModels.map((model, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-dark mb-2">{model.name}</h3>
                <div className="text-2xl font-bold text-primary mb-2">{model.price}</div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold">Best for:</span> {model.bestFor}
                </div>
                <Link to="/pricing" className="block text-center bg-dark text-white py-2 rounded-lg hover:bg-primary transition">
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RCM Process Section */}
      <RCMProcess />

      {/* Specialty Services Section */}
      <SpecialtyServices />

      {/* Client Logos Strip */}
      <ClientLogos />

      {/* EHR Partners Section */}
      <EHRPartners />

      {/* News & Press Section */}
      <NewsPress />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={fallbackDoctorImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {homeContent?.cta_title || 'Ready to Maximize Your Revenue?'}
          </h2>
          <p className="text-xl mb-8">
            {homeContent?.cta_subtitle || 'Join 150+ healthcare providers who trust MahaStar for their billing needs'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-accent hover:bg-secondary px-8 py-3 rounded-lg font-semibold transition">
              {homeContent?.cta_button_text || 'Schedule a Free Consultation'}
            </Link>
            <Link to="/case-studies" className="bg-white/10 border border-white/30 hover:bg-white/20 px-8 py-3 rounded-lg font-semibold transition">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;