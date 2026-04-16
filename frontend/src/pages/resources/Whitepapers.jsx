import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, Calendar, CheckCircle } from 'lucide-react';

const Whitepapers = () => {
  const [formData, setFormData] = useState({ name: '', email: '', practice: '' });

  const whitepapers = [
    {
      id: 1,
      title: 'The Complete Guide to Revenue Cycle Management Optimization',
      description: 'Learn how to reduce AR days by 40% and increase net collections by 25%.',
      pages: 24,
      date: 'January 2025',
      category: 'RCM Strategy'
    },
    {
      id: 2,
      title: 'Medical Coding Accuracy: Best Practices for 2025',
      description: 'How to achieve 99%+ coding accuracy and avoid audit penalties.',
      pages: 18,
      date: 'February 2025',
      category: 'Medical Coding'
    },
    {
      id: 3,
      title: 'Denial Management: Root Cause Analysis and Prevention',
      description: 'Systematic approach to reducing denial rates by 60% or more.',
      pages: 22,
      date: 'March 2025',
      category: 'Denial Management'
    },
    {
      id: 4,
      title: 'Provider Credentialing: Accelerating Time to Revenue',
      description: 'Reduce credentialing time from 90 days to under 45 days.',
      pages: 16,
      date: 'April 2025',
      category: 'Credentialing'
    },
    {
      id: 5,
      title: 'Value-Based Care Billing: A Practical Guide',
      description: 'Navigate MIPS, APMs, and quality reporting requirements.',
      pages: 28,
      date: 'May 2025',
      category: 'Value-Based Care'
    }
  ];

  const handleDownload = (e) => {
    e.preventDefault();
    alert(`Thank you! The whitepaper will be sent to ${formData.email}`);
    setFormData({ name: '', email: '', practice: '' });
  };

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FileText className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Whitepapers & Research</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">In-depth research and guides to optimize your medical billing operations.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {whitepapers.map((wp) => (
                  <div key={wp.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{wp.category}</span>
                          <span className="text-gray-400 text-xs flex items-center gap-1"><Calendar size={12} />{wp.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-2">{wp.title}</h3>
                        <p className="text-gray-600 mb-3">{wp.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{wp.pages} pages</span>
                        </div>
                      </div>
                      <button
                        onClick={() => document.getElementById(`modal-${wp.id}`).classList.remove('hidden')}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2"
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>

                    {/* Download Modal */}
                    <div id={`modal-${wp.id}`} className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
                        <h3 className="text-xl font-bold text-dark mb-4">Download Whitepaper</h3>
                        <form onSubmit={handleDownload}>
                          <input type="text" placeholder="Full Name" className="w-full border rounded-lg px-4 py-2 mb-3" required />
                          <input type="email" placeholder="Email Address" className="w-full border rounded-lg px-4 py-2 mb-3" required />
                          <input type="text" placeholder="Practice Name" className="w-full border rounded-lg px-4 py-2 mb-4" />
                          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Download Now</button>
                          <button type="button" onClick={() => document.getElementById(`modal-${wp.id}`).classList.add('hidden')} className="w-full text-gray-500 mt-2">Cancel</button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">All Whitepapers Include</h3>
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

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Request Custom Research</Link>
      </section>
    </div>
  );
};

export default Whitepapers;