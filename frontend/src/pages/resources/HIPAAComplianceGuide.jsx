import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, FileText, Download } from 'lucide-react';

const HIPAAComplianceGuide = () => {
  const sections = [
    { title: 'HIPAA Overview', items: ['What is HIPAA?', 'Who must comply?', 'Penalties for non-compliance'] },
    { title: 'Privacy Rule', items: ['Protected Health Information (PHI)', 'Patient rights', 'Minimum necessary standard'] },
    { title: 'Security Rule', items: ['Administrative safeguards', 'Physical safeguards', 'Technical safeguards'] },
    { title: 'Breach Notification', items: ['When to notify', 'How to notify', 'Risk assessment'] },
    { title: 'Business Associate Agreements', items: ['When required', 'Required provisions', 'Compliance obligations'] }
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Shield className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">HIPAA Compliance Guide</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Complete guide to HIPAA compliance for healthcare providers.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">Your HIPAA Compliance Partner</h2>
            <p className="text-gray-700 mb-4">
              MahaStar is fully HIPAA compliant, SOC2 Type II audited, and VAPT certified. 
              We sign Business Associate Agreements (BAA) with all clients and maintain 
              enterprise-grade security controls.
            </p>
            <div className="flex gap-2">
              <Lock className="text-primary" />
              <span className="font-semibold">Our Certifications:</span>
              <span>HIPAA Compliant • SOC2 Type II • VAPT Audited</span>
            </div>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-xl font-bold text-dark mb-3">{section.title}</h3>
              <ul className="space-y-2 pl-4">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <FileText className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold text-dark mb-2">Download Full Compliance Guide</h3>
            <p className="text-gray-600 mb-4">Get our complete 24-page HIPAA compliance guide for medical practices.</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-secondary transition">
              <Download size={16} /> Download PDF
            </button>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Request Compliance Consultation</Link>
      </section>
    </div>
  );
};

export default HIPAAComplianceGuide;