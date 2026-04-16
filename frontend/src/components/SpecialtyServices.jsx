import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Bone, Stethoscope, Baby, Eye } from 'lucide-react';

const specialties = [
  { icon: Heart, name: 'Cardiology', desc: 'Complex coding for cardiac procedures, EKGs, stress tests' },
  { icon: Brain, name: 'Neurology', desc: 'EMG, nerve conduction, EEG coding specialists' },
  { icon: Bone, name: 'Orthopedics', desc: 'Surgical and non-surgical orthopedic billing' },
  { icon: Stethoscope, name: 'Primary Care', desc: 'Preventive care, chronic disease management' },
  { icon: Baby, name: 'Pediatrics', desc: 'Well-child visits, vaccinations, developmental screenings' },
  { icon: Eye, name: 'Ophthalmology', desc: 'Cataract surgery, retinal procedures, vision exams' },
];

const SpecialtyServices = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">Specialty Focused Billing Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We have specialized teams of AAPC certified medical billing specialists who hold specialty-specific certifications
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((spec, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <spec.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">{spec.name}</h3>
              <p className="text-gray-600">{spec.desc}</p>
              <Link to="/contact" className="inline-block mt-4 text-primary font-medium hover:underline">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtyServices;