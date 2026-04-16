import React from 'react';
import { Link } from 'react-router-dom';

const Payers = () => {
  const payers = [
    { name: 'Medicare', slug: 'medicare', description: 'Expert Medicare billing services' },
    { name: 'Medicaid', slug: 'medicaid', description: 'Multi-state Medicaid billing' },
    { name: 'Blue Cross Blue Shield', slug: 'blue-cross', description: 'BCBS billing across all plans' },
    { name: 'UnitedHealthcare', slug: 'united-healthcare', description: 'UHC commercial and Medicare Advantage' },
    { name: 'Aetna', slug: 'aetna', description: 'Aetna billing services' },
    { name: 'Cigna', slug: 'cigna', description: 'Cigna commercial and international' },
    { name: 'Humana', slug: 'humana', description: 'Humana Medicare Advantage' },
    { name: 'Tricare', slug: 'tricare', description: 'Military healthcare billing' },
    { name: 'Workers Compensation', slug: 'workers-comp', description: 'State-specific WC billing' },
    { name: 'Commercial Insurance', slug: 'commercial', description: 'All commercial payers' }
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Insurance Payers</h1>
          <p className="text-xl text-blue-100">Expert billing for all major insurance payers</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payers.map((payer) => (
              <Link key={payer.slug} to={`/payers/${payer.slug}`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-dark mb-2">{payer.name}</h3>
                <p className="text-gray-600">{payer.description}</p>
                <div className="mt-4 text-primary font-semibold">Learn More →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payers;