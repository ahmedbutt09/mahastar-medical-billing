import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Bone, Stethoscope, Baby, Eye, Activity, Shield, DollarSign, Headphones } from 'lucide-react';

const specialties = [
  { icon: Heart, name: 'Cardiology', desc: 'Complex coding for cardiac procedures, EKGs, stress tests', slug: 'cardiology' },
  { icon: Brain, name: 'Neurology', desc: 'EMG, nerve conduction, EEG coding specialists', slug: 'neurology' },
  { icon: Bone, name: 'Orthopedics', desc: 'Surgical and non-surgical orthopedic billing', slug: 'orthopedics' },
  { icon: Stethoscope, name: 'Primary Care', desc: 'Preventive care, chronic disease management', slug: 'primary-care' },
  { icon: Baby, name: 'Pediatrics', desc: 'Well-child visits, vaccinations, developmental screenings', slug: 'pediatrics' },
  { icon: Eye, name: 'Ophthalmology', desc: 'Cataract surgery, retinal procedures, vision exams', slug: 'ophthalmology' },
  { icon: Activity, name: 'Dermatology', desc: 'Medical, surgical, and cosmetic dermatology coding', slug: 'dermatology' },
  { icon: Shield, name: 'Urology', desc: 'Specialized billing for urological procedures', slug: 'urology' },
  { icon: DollarSign, name: 'Gastroenterology', desc: 'Endoscopy and GI procedure coding', slug: 'gastroenterology' },
  { icon: Headphones, name: 'Psychiatry', desc: 'Mental health and therapy billing', slug: 'psychiatry' },
];

const SpecialtyServices = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">Specialty Focused Billing Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We have specialized teams of AAPC certified medical billing specialists who hold specialty-specific certifications
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((spec, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group">
              <spec.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">{spec.name}</h3>
              <p className="text-gray-600">{spec.desc}</p>
              <Link 
                to={`/specialties/${spec.slug}`} 
                className="inline-block mt-4 text-primary font-medium hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
        
        {/* View All Specialties CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/specialties" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-all"
          >
            View All Specialties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtyServices;