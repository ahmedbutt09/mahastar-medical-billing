import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, DollarSign, Award } from 'lucide-react';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: 'Cardiology Associates of Texas',
      specialty: 'Cardiology',
      challenge: '62-day AR, 15% denial rate, $850k in outstanding claims',
      solution: 'Full RCM takeover with dedicated AR team',
      results: [
        'AR reduced from 62 to 19 days',
        'Denial rate dropped from 15% to 4.2%',
        '$1.2M in previously denied claims recovered',
        'Staff workload reduced by 25 hours/week'
      ],
      quote: '"Mahastar transformed our revenue cycle. We\'re finally getting paid for the work we do."',
      author: 'Dr. Sarah Jenkins, CFO',
    },
    {
      id: 2,
      title: 'Coastal Surgical Hospital',
      specialty: 'Surgery / Hospital',
      challenge: '91% coding accuracy, frequent audits, $480k annual penalties',
      solution: 'Specialized surgical coding team + AI-assisted audits',
      results: [
        'Coding accuracy improved from 91% to 99.2%',
        '$480k annual audit penalties eliminated',
        'DNFB reduced by 67%',
        'Revenue increased by 23% in 6 months'
      ],
      quote: '"The coding accuracy alone paid for their services ten times over."',
      author: 'Michael Chen, COO',
    },
    {
      id: 3,
      title: 'Family Care Physicians Group',
      specialty: 'Primary Care',
      challenge: '10 providers, overwhelmed billing staff, $340k in aged AR',
      solution: 'Co-managed model + credentialing services',
      results: [
        '$340k recovered from aged AR (>120 days)',
        'Credentialing time reduced from 90 to 42 days',
        'First-pass acceptance rate: 94% → 98%',
        'Monthly collections up 31%'
      ],
      quote: '"We were ready to give up on that AR. Mahastar got it back."',
      author: 'Dr. James Wilson, Owner',
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Real Results from Healthcare Leaders
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped practices like yours maximize revenue and reduce administrative burden
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <div className="inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
                    {study.specialty}
                  </div>
                  <h2 className="text-2xl font-bold text-dark mb-3">{study.title}</h2>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700">Challenge:</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700">Solution:</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700">Results:</h4>
                    <ul className="space-y-1 mt-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mt-4">
                    <p className="text-gray-700 italic">"{study.quote}"</p>
                    <p className="text-sm text-gray-500 mt-2">— {study.author}</p>
                  </div>
                  <Link to="/contact" className="inline-block mt-6 bg-dark text-white px-6 py-2 rounded-lg hover:bg-primary transition">
                    Get Similar Results →
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-dark to-primary p-8 flex flex-col justify-center text-white">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold">{study.results[0].match(/\d+\.?\d*[KM]?/)?.[0] || 'N/A'}</div>
                      <div className="text-xs text-blue-100">Recovered</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold">-65%</div>
                      <div className="text-xs text-blue-100">AR Days</div>
                    </div>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-sm text-blue-100">Ready for similar results?</p>
                    <Link to="/contact" className="block text-center bg-accent text-white py-2 rounded-lg mt-2 hover:bg-secondary transition">
                      Schedule a Free Assessment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-dark to-primary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to Write Your Own Success Story?</h3>
          <p className="text-blue-100 mb-6">Join 150+ healthcare providers who trust MahaStar for their billing needs</p>
          <Link to="/contact" className="bg-accent hover:bg-secondary px-8 py-3 rounded-lg font-semibold inline-block transition">
            Get Your Free RCM Audit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;