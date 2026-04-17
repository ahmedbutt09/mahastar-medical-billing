// src/pages/company/Leadership.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Users, Loader } from 'lucide-react';
import api from '../../api';

const Leadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const response = await api.get('/api/leadership');
      if (response.data.success) {
        setLeaders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching leadership:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Users className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Leadership Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Meet the experts driving innovation in medical billing and RCM.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader) => (
              <div key={leader.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 h-64 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">
                      {leader.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-dark mb-1">{leader.name}</h3>
                  <p className="text-primary font-medium mb-3">{leader.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                  <div className="flex justify-center gap-3">
                    {leader.email && (
                      <a href={`mailto:${leader.email}`} className="text-gray-400 hover:text-primary transition">
                        <Mail size={18} />
                      </a>
                    )}
                    {leader.linkedin_url && (
                      <a href={leader.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block hover:bg-secondary transition">
          Contact Our Leadership Team
        </Link>
      </section>
    </div>
  );
};

export default Leadership;