import React from 'react';
import { Link } from 'react-router-dom';

const Specialties = () => {
  const specialties = [
    { name: 'Cardiology', slug: 'cardiology', description: 'Heart care billing specialists' },
    { name: 'Orthopedics', slug: 'orthopedics', description: 'Bone and joint procedure billing' },
    { name: 'Neurology', slug: 'neurology', description: 'Brain and nervous system billing' },
    { name: 'Primary Care', slug: 'primary-care', description: 'Family medicine and general practice' },
    { name: 'Pediatrics', slug: 'pediatrics', description: 'Children\'s healthcare billing' },
    { name: 'Ophthalmology', slug: 'ophthalmology', description: 'Eye care billing experts' },
    { name: 'Dermatology', slug: 'dermatology', description: 'Skin care procedure billing' },
    { name: 'Urology', slug: 'urology', description: 'Urinary tract and male reproductive billing' },
    { name: 'Gastroenterology', slug: 'gastroenterology', description: 'Digestive system billing' },
    { name: 'Oncology', slug: 'oncology', description: 'Cancer treatment billing' },
    { name: 'Radiology', slug: 'radiology', description: 'Medical imaging billing' },
    { name: 'Anesthesiology', slug: 'anesthesiology', description: 'Anesthesia and pain management billing' },
    { name: 'Psychiatry', slug: 'psychiatry', description: 'Mental health billing' },
    { name: 'Pulmonology', slug: 'pulmonology', description: 'Lung and respiratory billing' },
    { name: 'Nephrology', slug: 'nephrology', description: 'Kidney disease billing' }
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Medical Specialties</h1>
          <p className="text-xl text-blue-100">Specialized billing for 15+ medical specialties</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((spec) => (
              <Link key={spec.slug} to={`/specialties/${spec.slug}`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-dark mb-2">{spec.name}</h3>
                <p className="text-gray-600">{spec.description}</p>
                <div className="mt-4 text-primary font-semibold">Learn More →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialties;