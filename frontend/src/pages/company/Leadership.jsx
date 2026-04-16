import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

const Leadership = () => {
  const leaders = [
    {
      name: 'John Smith',
      title: 'CEO & Founder',
      bio: '20+ years in healthcare RCM. Former VP at major billing organization.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Sarah Johnson',
      title: 'Chief Operating Officer',
      bio: 'Expert in operational efficiency and team scaling.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Michael Chen',
      title: 'Chief Technology Officer',
      bio: 'AI and automation specialist with 15+ years in health tech.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'Medical Coding Director',
      bio: 'AAPC-certified with 12+ specialties expertise.',
      image: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Leadership Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Meet the experts driving healthcare revenue cycle innovation.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👤
                </div>
                <h3 className="text-xl font-bold text-dark">{leader.name}</h3>
                <p className="text-primary font-semibold mb-2">{leader.title}</p>
                <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-primary"><Linkedin size={18} /></a>
                  <a href="#" className="text-gray-400 hover:text-primary"><Mail size={18} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;