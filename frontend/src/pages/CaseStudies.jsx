import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, DollarSign, Award, Loader, Filter } from 'lucide-react';
import api from '../api';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [specialties, setSpecialties] = useState(['All']);

  useEffect(() => {
    fetchCaseStudies();
  }, [selectedSpecialty]);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      let url = '/api/case-studies';
      if (selectedSpecialty !== 'All') {
        url += `?specialty=${encodeURIComponent(selectedSpecialty)}`;
      }
      const response = await api.get(url);
      if (response.data.success) {
        setCaseStudies(response.data.data);
        
        // Extract unique specialties for filter
        const uniqueSpecialties = ['All', ...new Set(response.data.data.map(cs => cs.specialty).filter(Boolean))];
        setSpecialties(uniqueSpecialties);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to extract first metric for stats display
  const getRecoveredAmount = (study) => {
    if (study.metrics?.recovered) return study.metrics.recovered;
    const firstResult = study.results?.[0] || '';
    const match = firstResult.match(/\$?\d+\.?\d*[KM]?/);
    return match ? match[0] : 'N/A';
  };

  const getARReduction = (study) => {
    if (study.metrics?.ar_reduction) return study.metrics.ar_reduction;
    const arResult = study.results?.find(r => r.includes('AR') || r.includes('days'));
    if (arResult) {
      const match = arResult.match(/-?\d+%/);
      return match ? match[0] : '-65%';
    }
    return '-65%';
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

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

        {/* Specialty Filter */}
        {specialties.length > 2 && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {specialties.map(specialty => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedSpecialty === specialty
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Case Studies Grid */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No case studies found for {selectedSpecialty}.</p>
          </div>
        ) : (
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
                        {study.results?.map((result, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 mt-4">
                      <p className="text-gray-700 italic">"{study.quote}"</p>
                      <p className="text-sm text-gray-500 mt-2">— {study.quote_author}</p>
                    </div>
                    <Link to="/contact" className="inline-block mt-6 bg-dark text-white px-6 py-2 rounded-lg hover:bg-primary transition">
                      Get Similar Results →
                    </Link>
                  </div>
                  <div className="bg-gradient-to-br from-dark to-primary p-8 flex flex-col justify-center text-white">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                        <div className="text-2xl font-bold">{getRecoveredAmount(study)}</div>
                        <div className="text-xs text-blue-100">Recovered</div>
                      </div>
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                        <div className="text-2xl font-bold">{getARReduction(study)}</div>
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
        )}

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