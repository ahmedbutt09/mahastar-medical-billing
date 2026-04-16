import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Medical Coder',
      department: 'Operations',
      location: 'Remote (US)',
      type: 'Full-time',
      salary: '$55k - $75k',
      description: 'Seeking certified medical coders with 2+ years experience.'
    },
    {
      id: 2,
      title: 'AR Specialist',
      department: 'Revenue Cycle',
      location: 'Remote (US)',
      type: 'Full-time',
      salary: '$45k - $60k',
      description: 'Experienced in accounts receivable follow-up and denial management.'
    },
    {
      id: 3,
      title: 'Client Success Manager',
      department: 'Client Services',
      location: 'Remote (US)',
      type: 'Full-time',
      salary: '$65k - $85k',
      description: 'Manage client relationships and ensure satisfaction.'
    },
    {
      id: 4,
      title: 'Software Engineer',
      department: 'Technology',
      location: 'Remote (US)',
      type: 'Full-time',
      salary: '$90k - $120k',
      description: 'Build RCM automation and integration tools.'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Briefcase className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Help us transform healthcare revenue cycle management.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-dark">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 mb-3">
                      <span className="flex items-center gap-1 text-sm text-gray-500"><MapPin size={14} />{job.location}</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500"><Clock size={14} />{job.type}</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500"><DollarSign size={14} />{job.salary}</span>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 text-center mt-8">
            <h3 className="text-xl font-bold text-dark mb-2">Don't see the right fit?</h3>
            <p className="text-gray-600 mb-4">Send us your resume and we'll keep you in mind for future opportunities.</p>
            <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-lg inline-block">Submit General Application</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;