import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'General',
      q: 'What makes MahaStar different from other medical billing companies?',
      a: 'MahaStar combines 20+ years of healthcare RCM experience with AI-enabled technology. We offer 98% first-pass claim acceptance, dedicated account managers, and transparent pricing with no long-term contracts.'
    },
    {
      category: 'General',
      q: 'How quickly can you start billing for my practice?',
      a: 'Most practices are fully onboarded within 7-14 days. This includes EHR integration, team training, and claims submission setup.'
    },
    {
      category: 'Pricing',
      q: 'What are your pricing models?',
      a: 'We offer four scalable models: End-to-End RCM (% of collections), Partial RCM (module-based), Co-Managed (hourly), and FTE Model (monthly fixed fee).'
    },
    {
      category: 'Pricing',
      q: 'Are there any hidden fees?',
      a: 'No. Our pricing is completely transparent. What we quote is what you pay. No setup fees, no cancellation fees.'
    },
    {
      category: 'Compliance',
      q: 'Are you HIPAA compliant?',
      a: 'Yes. We are fully HIPAA compliant, SOC2 Type II audited, and VAPT certified. All staff undergo annual compliance training.'
    },
    {
      category: 'Compliance',
      q: 'Do you sign Business Associate Agreements (BAA)?',
      a: 'Yes. We sign BAAs with every client as required by HIPAA regulations.'
    },
    {
      category: 'Technology',
      q: 'Which EHR systems do you integrate with?',
      a: 'We integrate with 50+ EHRs including Epic, Cerner, eClinicalWorks, Athenahealth, NextGen, Kareo, Practice Fusion, and Allscripts.'
    },
    {
      category: 'Technology',
      q: 'Do you provide reporting and analytics?',
      a: 'Yes. You get a real-time dashboard with key metrics including AR days, denial rates, collection rates, and revenue trends.'
    },
    {
      category: 'Services',
      q: 'What specialties do you serve?',
      a: 'We serve 15+ specialties including Cardiology, Orthopedics, Neurology, Primary Care, Pediatrics, Ophthalmology, Dermatology, Urology, Gastroenterology, Oncology, Radiology, Anesthesiology, Psychiatry, Pulmonology, and Nephrology.'
    },
    {
      category: 'Services',
      q: 'Do you handle credentialing?',
      a: 'Yes. Our credentialing team reduces turnaround time from 90+ days to under 45 days for Medicare, Medicaid, and commercial payers.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Find answers to common questions about our medical billing services.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary"
            />
          </div>

          {/* FAQ Categories */}
          {categories.map(category => {
            const categoryFaqs = filteredFaqs.filter(f => f.category === category);
            if (categoryFaqs.length === 0) return null;
            
            return (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold text-dark mb-4">{category}</h2>
                <div className="space-y-3">
                  {categoryFaqs.map((faq, idx) => {
                    const isOpen = openIndex === `${category}-${idx}`;
                    return (
                      <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : `${category}-${idx}`)}
                          className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition"
                        >
                          <span className="font-semibold text-dark">{faq.q}</span>
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-600">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Contact CTA */}
          <div className="bg-primary/10 rounded-xl p-8 text-center mt-8">
            <h3 className="text-xl font-bold text-dark mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our team is here to help you find the answers you need.</p>
            <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-lg inline-block hover:bg-secondary transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;