import React from 'react';

const ehrs = [
  { name: 'Epic', logo: '🏥' },
  { name: 'eClinicalWorks', logo: '💻' },
  { name: 'Veradigm (Allscripts)', logo: '📊' },
  { name: 'Cerner', logo: '🏨' },
  { name: 'Athenahealth', logo: '☁️' },
  { name: 'NextGen', logo: '📋' },
  { name: 'Practice Fusion', logo: '🔬' },
  { name: 'Kareo', logo: '💊' },
];

const EHRPartners = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dark mb-3">EHRs We Work With</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At MahaStar we know the features and workarounds of your EHR system. 
            All our RCM billing services tools are integrated with the system you use.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {ehrs.map((ehr, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-2">{ehr.logo}</div>
              <div className="text-sm font-medium text-gray-700">{ehr.name}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <span className="text-primary font-semibold">+ 50+ more EHR systems</span>
        </div>
      </div>
    </section>
  );
};

export default EHRPartners;