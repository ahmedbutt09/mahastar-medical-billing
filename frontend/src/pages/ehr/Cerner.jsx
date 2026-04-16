import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Cerner = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🏨</div>
          <h1 className="text-5xl font-bold mb-4">Cerner EHR Integration</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Seamless Cerner integration for hospital and health system RCM.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">300+</div><div className="text-gray-600">Cerner Sites</div></div>
            <div><div className="text-3xl font-bold text-primary">7</div><div className="text-gray-600">Days Integration</div></div>
            <div><div className="text-3xl font-bold text-primary">99%</div><div className="text-gray-600">Data Accuracy</div></div>
            <div><div className="text-3xl font-bold text-primary">24/7</div><div className="text-gray-600">Cerner Support</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Complete Cerner RCM Integration</h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Cerner Solutions We Support</h4>
                <div className="flex flex-wrap gap-2">
                  {['Cerner Millennium', 'Cerner PowerWorks', 'Cerner CommunityWorks', 'Cerner RevElate', 'Cerner HealtheIntent', 'Cerner Soarian'].map(module => (
                    <span key={module} className="bg-white px-3 py-1 rounded-full text-sm">{module}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Cerner Integration Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A Cerner integration specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Schedule Cerner Integration →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Start Cerner Integration</Link>
      </section>
    </div>
  );
};

export default Cerner;