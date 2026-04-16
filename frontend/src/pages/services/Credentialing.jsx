import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Building2,
  FileText,
  Users,
  Calendar,
  Award,
  TrendingUp,
  Mail
} from 'lucide-react';

const Credentialing = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    providerCount: ''
  });

  const stats = [
    { value: '42 Days', label: 'Average Credentialing Time', icon: Clock, note: 'Industry avg: 90-120 days' },
    { value: '50+', label: 'Payers Contracted', icon: Building2 },
    { value: '100%', label: 'CAQH Maintenance', icon: Shield },
    { value: '24/7', label: 'EDI Support', icon: Users },
  ];

  const payers = [
    'Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'UnitedHealthcare',
    'Aetna', 'Cigna', 'Humana', 'Tricare', 'Workers Compensation',
    'MultiPlan', 'First Health', 'And 40+ commercial payers'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Credentialing Request:', formData);
    alert('Thank you! A credentialing specialist will contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', providerCount: '' });
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Provider Credentialing Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Superfast credentialing with federal, private, and workers compensation payers
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.note && <div className="text-xs text-gray-400 mt-1">{stat.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Bid Goodbye to Downtimes and Lengthy Credentialing Processes</h2>
              <p className="text-gray-600 mb-6">
                Our credentialing/re-credentialing team helps group practices, healthcare organizations, and independent 
                medical practices across the country to credential effortlessly with federal, private, and workers 
                compensation payers. We also offer clearinghouse enrollment services and EDI support.
              </p>

              <h3 className="text-2xl font-bold text-dark mb-4">What Our Credentialing Team Does</h3>
              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-dark">Medicare Revalidation Support</h4>
                    <p className="text-gray-600 text-sm">Ensure continuous participation with CMS</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-dark">CAQH Profile Maintenance</h4>
                    <p className="text-gray-600 text-sm">Quarterly attestations and updates</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-dark">Managed Care Contracting</h4>
                    <p className="text-gray-600 text-sm">Negotiate optimal reimbursement rates</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-dark">Turnaround Time Reduction</h4>
                    <p className="text-gray-600 text-sm">42-day average vs. 90+ days industry standard</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Payers We Credential With</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {payers.map((payer, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {payer}
                  </span>
                ))}
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-dark mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Why Choose Our Credentialing Team?
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Dedicated credentialing specialists with 10+ years experience</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Parallel processing with multiple payers simultaneously</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Weekly status updates and milestone tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Re-credentialing calendar to avoid lapses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Start Credentialing Today</h3>
              <p className="text-gray-600 text-sm mb-6">
                Get credentialed in 42 days or less. Fill out the form and we'll contact you within 24 hours.
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
                    placeholder="Dr. Sarah Wilson"
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
                    placeholder="sarah@practice.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Providers</label>
                  <select
                    value={formData.providerCount}
                    onChange={(e) => setFormData({...formData, providerCount: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select number</option>
                    <option value="1-5">1-5 Providers</option>
                    <option value="6-20">6-20 Providers</option>
                    <option value="21-50">21-50 Providers</option>
                    <option value="50+">50+ Providers</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                >
                  Start Credentialing →
                </button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free consultation. No obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-10">Our Credentialing Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full hidden md:block"></div>
            <div className="space-y-8">
              {[
                { week: 'Week 1', title: 'Intake & Document Collection', desc: 'Gather all required documents, licenses, and certifications' },
                { week: 'Week 2-3', title: 'Application Submission', desc: 'Submit to all selected payers simultaneously' },
                { week: 'Week 4-5', title: 'Follow-up & Expedite', desc: 'Daily follow-up calls to payer credentialing departments' },
                { week: 'Week 6', title: 'Contracting & Signature', desc: 'Review and execute payer contracts' },
              ].map((step, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row gap-4 items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 p-4">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="text-primary font-bold mb-2">{step.week}</div>
                      <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Credentialed?</h2>
          <p className="text-xl text-blue-100 mb-6">Stop losing revenue to credentialing delays</p>
          <Link to="/contact" className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition inline-block">
            Schedule a Credentialing Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Credentialing;