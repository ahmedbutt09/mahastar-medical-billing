import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Award, 
  TrendingUp, 
  Shield, 
  Clock, 
  FileCheck,
  Users,
  BarChart3,
  PhoneCall
} from 'lucide-react';

const MedicalCoding = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    phone: ''
  });

  const features = [
    { icon: Award, title: '99.2% Coding Accuracy', desc: 'Our certified coders and quality analysts guarantee industry-leading accuracy' },
    { icon: Shield, title: 'NCCI Compliance', desc: 'Stay compliant with NCCI regulations and avoid audit penalties' },
    { icon: Clock, title: 'Reduce DNFB', desc: 'Cut down Days Not Final Billed with faster coding throughput' },
    { icon: TrendingUp, title: 'Maximize Revenue', desc: 'Capture every billable service with precise code selection' },
  ];

  const specialties = [
    'Cardiology', 'Orthopedics', 'Neurology', 'Primary Care', 
    'Pediatrics', 'Ophthalmology', 'General Surgery', 'Emergency Medicine',
    'Radiology', 'Anesthesiology', 'Urology', 'Dermatology'
  ];

  const certifications = [
    'AAPC Certified Professional Coders (CPC)',
    'Certified Outpatient Coders (COC)',
    'Certified Inpatient Coders (CIC)',
    'Certified Risk Adjustment Coders (CRC)',
    'Certified Professional Billers (CPB)',
    'AHIMA Certified Coding Specialists (CCS)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will integrate with your existing API
    console.log('Form submitted:', formData);
    alert('Thank you! A coding specialist will contact you within 24 hours.');
    setFormData({ name: '', email: '', practice: '', phone: '' });
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Coding Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              AAPC-certified coding experts delivering 99.2% accuracy with specialty-specific expertise
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">99.2%</div>
              <div className="text-sm text-gray-600">Coding Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-gray-600">Certified Coders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-gray-600">Specialties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Features */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Precision Medical Coding That Maximizes Reimbursement</h2>
              <p className="text-gray-600 mb-6">
                Medical coding is a complex job. Our certified medical coding experts, code auditors, and quality analysts 
                guarantee 99.2% coding accuracy. Is your coding process on the right path?
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3">
                    <feature.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-dark">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Specialty-Focused Coding Expertise</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {specialties.map((spec, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {spec}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Our Certifications</h3>
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Our Quality Assurance Process</h4>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span className="text-gray-700">Initial coding by specialty-matched certified coder</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span className="text-gray-700">AI-assisted code validation and error detection</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span className="text-gray-700">Independent quality auditor review (10% sample minimum)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <span className="text-gray-700">Final approval and submission to billing team</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Schedule a Coding Audit</h3>
              <p className="text-gray-600 text-sm mb-6">
                Our coding expert Holly Casano will review your current coding process and provide actionable insights.
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
                    placeholder="Cardiology Associates"
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
                  Request Coding Audit →
                </button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free, no-obligation coding assessment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-dark mb-4">Ready to Improve Your Coding Accuracy?</h2>
          <p className="text-gray-600 mb-6">
            Join practices that have increased revenue by capturing every billable service
          </p>
          <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition inline-block">
            Talk to a Coding Specialist
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MedicalCoding;