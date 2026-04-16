import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Epic = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const features = [
    'Seamless Epic RCM integration',
    'Automated claim submission from Epic',
    'Real-time eligibility verification',
    'Epic denial management workflow',
    'Custom Epic reporting dashboards',
    'Epic training for your team'
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-5xl font-bold mb-4">Epic EHR Integration</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Seamless Epic integration for automated RCM workflows, claim submission, and denial management.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">500+</div><div className="text-gray-600">Epic Practices</div></div>
            <div><div className="text-3xl font-bold text-primary">7</div><div className="text-gray-600">Days Integration</div></div>
            <div><div className="text-3xl font-bold text-primary">98%</div><div className="text-gray-600">Data Accuracy</div></div>
            <div><div className="text-3xl font-bold text-primary">24/7</div><div className="text-gray-600">Epic Support</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Complete Epic RCM Integration</h2>
              <p className="text-gray-600 mb-6">
                We specialize in Epic EHR integration, ensuring seamless data flow between your Epic system and our RCM platform. 
                Our certified Epic integration specialists handle everything from initial setup to ongoing support.
              </p>

              <h3 className="text-2xl font-bold text-dark mb-4">Epic Integration Features</h3>
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Epic Modules We Support</h4>
                <div className="flex flex-wrap gap-2">
                  {['Epic Cadence', 'Epic Resolute', 'Epic Prelude', 'Epic Welcome', 'Epic MyChart', 'Epic Healthy Planet', 'Epic Cogito', 'Epic Grand Central'].map(module => (
                    <span key={module} className="bg-white px-3 py-1 rounded-full text-sm">{module}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Epic Integration Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('An Epic integration specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Schedule Epic Integration →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Start Epic Integration</Link>
      </section>
    </div>
  );
};

export default Epic;