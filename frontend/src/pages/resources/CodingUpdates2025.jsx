import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, AlertCircle, CheckCircle, Download } from 'lucide-react';

const CodingUpdates2025 = () => {
  const [selectedYear, setSelectedYear] = useState('2025');

  const updates = {
    2025: {
      title: '2025 CPT Code Changes',
      effective: 'January 1, 2025',
      changes: [
        { code: 'XXXXX', description: 'New telehealth consultation code', impact: 'High' },
        { code: 'YYYYY', description: 'Revised E/M documentation guidelines', impact: 'Medium' },
        { code: 'ZZZZZ', description: 'Deleted obsolete radiology codes', impact: 'Low' }
      ]
    }
  };

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Calendar className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Coding Updates 2025</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Stay current with CPT, ICD-10, and HCPCS coding changes.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-yellow-600" />
              <span className="font-semibold">Effective January 1, 2025</span>
            </div>
            <p className="text-gray-700 mt-2">All providers must implement these coding changes to ensure accurate reimbursement.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-dark mb-4">{updates[selectedYear].title}</h2>
            <p className="text-gray-600 mb-4">Effective: {updates[selectedYear].effective}</p>
            
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Impact</th>
                </tr>
              </thead>
              <tbody>
                {updates[selectedYear].changes.map((change, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 font-mono">{change.code}</td>
                    <td className="px-4 py-2">{change.description}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        change.impact === 'High' ? 'bg-red-100 text-red-700' :
                        change.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>{change.impact}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 text-center mt-8">
            <h3 className="text-xl font-bold text-dark mb-2">Need Help Implementing Coding Updates?</h3>
            <p className="text-gray-600 mb-4">Our coding specialists ensure 99.2% accuracy with all 2025 changes.</p>
            <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-lg inline-block">Schedule Coding Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CodingUpdates2025;