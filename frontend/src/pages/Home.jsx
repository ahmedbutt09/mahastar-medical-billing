import React from 'react';
import Testimonials from '../components/Testimonials';
import SpecialtyServices from '../components/SpecialtyServices';
import EHRPartners from '../components/EHRPartners';
import NewsPress from '../components/NewsPress';
import RCMProcess from '../components/RCMProcess';
import ClientLogos from '../components/ClientLogos';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  CheckCircle,
  DollarSign,
  FileCheck,
  Activity,
  Headphones,
  Zap,
  Award,
  BarChart3,
  Building2,
  ThumbsUp,
  FileText,
  PhoneCall,
  CreditCard,
  Users,
  Lock
} from 'lucide-react';

const Home = () => {
  const services = [
    { icon: TrendingUp, title: 'Revenue Cycle Management', desc: 'End-to-end RCM from patient registration to final payment', link: '/services/rcm' },
    { icon: FileCheck, title: 'Medical Coding', desc: 'AAPC-certified coders with 99.2% accuracy, specialty-specific', link: '/services/coding' },
    { icon: DollarSign, title: 'AR Management', desc: 'Aggressive AR recovery with patient/insurer calling', link: '/services/ar-management' },
    { icon: Shield, title: 'Provider Credentialing', desc: 'Medicare, Medicaid, commercial enrollment in <45 days', link: '/services/credentialing' },
    { icon: Activity, title: 'Denial Management', desc: 'Root-cause analysis + resubmission to recover lost revenue', link: '/services/denial-management' },
    { icon: Headphones, title: 'Telehealth Billing', desc: 'Coding & billing for virtual visits, compliant with payer policies', link: '/services/telehealth' },
  ];

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
    { name: 'End-to-End RCM', price: 'Custom', description: 'Full cycle: coding to payment posting', bestFor: '5+ providers' },
    { name: 'Partial RCM', price: 'Custom', description: 'Pick modules (coding + denial only)', bestFor: 'Practices with internal billers' },
    { name: 'Co-Managed', price: 'Hourly', description: 'We augment your team with specialists', bestFor: 'Flexible scaling' },
    { name: 'FTE Model', price: 'Monthly', description: 'Dedicated offshore team at 60% less cost', bestFor: 'High volume practices' },
  ];

  return (
    <div>
      {/* Hero Section - Professional Version with YOUR colors */}
      <section className="relative bg-gradient-to-br from-dark via-dark to-primary text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Trusted by 150+ Physician Groups</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Enterprise RCM That <span className="text-accent">Actually Increases</span> Your Net Collections
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                98% first-pass claim acceptance, 40% faster AR resolution, and full HIPAA/SOC2 compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-accent hover:bg-secondary text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center">
                  📊 Get Your Free RCM Audit →
                </Link>
                <Link to="/pricing" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all text-center">
                  💰 See Pricing Models
                </Link>
              </div>
              {/* Trust Bar */}
              <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/20">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <badge.icon className="w-5 h-5 text-accent" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-4">
                <span className="text-accent font-semibold">Real-time RCM Dashboard</span>
              </div>
              <div className="space-y-4">
                <div className="bg-dark/50 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span>Claim Acceptance Rate</span>
                    <span className="text-accent font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="bg-dark/50 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span>AR Days (Industry: 45)</span>
                    <span className="text-accent font-bold">22 Days</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '51%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-dark/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">$250M+</div>
                    <div className="text-xs text-gray-400">Claims Processed</div>
                  </div>
                  <div className="text-center p-3 bg-dark/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">99.2%</div>
                    <div className="text-xs text-gray-400">Coding Accuracy</div>
                  </div>
                </div>
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

      {/* Services Section - Expanded to 6 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">Full Spectrum RCM Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gain optimal reimbursement across both payment structures. Mitigate compliance risks. Improve medical coding efficiency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 block">
                <service.icon className="w-14 h-14 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-dark">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
                <div className="mt-4 text-primary font-medium flex items-center gap-1">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Models Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">4 Scalable Pricing Models That Fit Perfectly For Your Practice</h2>
            <p className="text-xl text-gray-600">Choose from 4 scalable RCM pricing models to boost profitability & efficiency</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingModels.map((model, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-dark mb-2">{model.name}</h3>
                <div className="text-2xl font-bold text-primary mb-2">{model.price}</div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold">Best for:</span> {model.bestFor}
                </div>
                <Link to="/contact" className="block text-center bg-dark text-white py-2 rounded-lg hover:bg-primary transition">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Maximize Your Revenue?
          </h2>
          <p className="text-xl mb-8">
            Join 150+ healthcare providers who trust MahaStar for their billing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-accent hover:bg-secondary px-8 py-3 rounded-lg font-semibold transition">
              Schedule a Free Consultation
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