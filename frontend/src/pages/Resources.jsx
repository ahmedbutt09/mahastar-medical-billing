import React from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const resources = [
    { name: 'Blog', path: '/blog', icon: '📝', description: 'Latest industry insights' },
    { name: 'Whitepapers', path: '/resources/whitepapers', icon: '📄', description: 'In-depth research guides' },
    { name: 'Webinars', path: '/resources/webinars', icon: '🎥', description: 'Expert-led sessions' },
    { name: 'FAQs', path: '/resources/faqs', icon: '❓', description: 'Common questions answered' },
    { name: 'RCM Glossary', path: '/resources/glossary', icon: '📚', description: 'Industry terminology' },
    { name: 'HIPAA Guide', path: '/resources/hipaa-guide', icon: '🔒', description: 'Compliance guide' },
    { name: 'Coding Updates', path: '/resources/coding-updates', icon: '📅', description: 'Latest code changes' },
    { name: 'Events', path: '/events', icon: '🗓️', description: 'Upcoming conferences' },
    { name: 'Magazine', path: '/magazine', icon: '📰', description: 'Quarterly publication' }
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-blue-100">Expert insights and educational materials</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link key={resource.path} to={resource.path} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-center">
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-2">{resource.name}</h3>
                <p className="text-gray-600">{resource.description}</p>
                <div className="mt-4 text-primary font-semibold">Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;