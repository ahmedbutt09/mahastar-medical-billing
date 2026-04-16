import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle } from 'lucide-react';

const Gastroenterology = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <TrendingUp className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Gastroenterology Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Specialized GI billing for colonoscopies, endoscopies, and advanced therapeutic procedures.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">96%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">1,000+</div><div className="text-gray-600">GI Practices Served</div></div>
            <div><div className="text-3xl font-bold text-primary">19</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">99%</div><div className="text-gray-600">Modifier 33/PT Accuracy</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Expert GI Coding & Billing</h2>
              <p className="text-gray-600 mb-6">Gastroenterology billing requires expertise in colonoscopy coding, modifier usage for preventive vs. diagnostic, and pathology coding.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Procedures We Code</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Colonoscopy (45378-45398)', 'EGD (43200-43259)', 'ERCP (43260-43278)', 'Capsule endoscopy (91110)', 'Manometry (91010-91020)', 'Hemorrhoid treatment (46930, 46221)', 'Liver biopsy (47000-47001)', 'pH monitoring (91034-91035)'].map(s => (
                  <span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Gastroenterology Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Modifier 33 and PT for preventive colonoscopy</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Screening vs. diagnostic colonoscopy distinction</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Polyp removal coding (polypectomy)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Anesthesia billing for GI procedures</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">GI Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A GI billing specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Request Consultation →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule a Free Consultation</Link>
      </section>
    </div>
  );
};

export default Gastroenterology;