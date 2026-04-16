import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Clock, Users, Play, CheckCircle } from 'lucide-react';

const Webinars = () => {
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const webinars = [
    {
      id: 1,
      title: 'Mastering Medicare Billing in 2025',
      date: 'March 15, 2025',
      time: '2:00 PM EST',
      duration: '60 min',
      speaker: 'Sarah Johnson, Medicare Specialist',
      description: 'Learn the latest Medicare billing updates, NCCI changes, and documentation requirements.',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Denial Management Strategies That Actually Work',
      date: 'April 10, 2025',
      time: '1:00 PM EST',
      duration: '45 min',
      speaker: 'Michael Chen, Denial Management Director',
      description: 'Root cause analysis techniques and appeal strategies that recover revenue.',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'AI in Medical Billing: What You Need to Know',
      date: 'February 20, 2025',
      time: '3:00 PM EST',
      duration: '50 min',
      speaker: 'Dr. Emily Rodriguez, RCM Technology Expert',
      description: 'How artificial intelligence is transforming claims processing and denial prediction.',
      status: 'recorded'
    },
    {
      id: 4,
      title: 'Provider Credentialing: From 90 Days to 45',
      date: 'January 25, 2025',
      time: '12:00 PM EST',
      duration: '55 min',
      speaker: 'David Park, Credentialing Manager',
      description: 'Proven strategies to accelerate payer enrollment and reduce revenue leakage.',
      status: 'recorded'
    }
  ];

  const handleRegister = (webinar) => {
    alert(`You've registered for "${webinar.title}". A calendar invite will be sent to your email.`);
  };

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Video className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Live & On-Demand Webinars</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Expert-led sessions on medical billing, coding, and RCM best practices.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark mb-8">Upcoming Webinars</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {webinars.filter(w => w.status === 'upcoming').map(webinar => (
              <div key={webinar.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">LIVE</span>
                      <span className="text-gray-400 text-xs flex items-center gap-1"><Calendar size={12} />{webinar.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">{webinar.title}</h3>
                    <p className="text-gray-600 mb-3">{webinar.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><Clock size={14} />{webinar.duration}</span>
                      <span className="flex items-center gap-1"><Users size={14} />{webinar.speaker}</span>
                    </div>
                    <button
                      onClick={() => handleRegister(webinar)}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                    >
                      Register Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-dark mb-8">Recorded Webinars</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {webinars.filter(w => w.status === 'recorded').map(webinar => (
              <div key={webinar.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-gray-400 text-xs">{webinar.date}</span>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{webinar.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{webinar.speaker}</p>
                <button
                  onClick={() => setSelectedWebinar(webinar)}
                  className="text-primary font-medium hover:underline flex items-center gap-1"
                >
                  Watch Recording →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Suggest a Webinar Topic</Link>
      </section>
    </div>
  );
};

export default Webinars;