import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Eye } from 'lucide-react';

const Magazine = () => {
  const issues = [
    { title: 'Winter 2025: AI in Healthcare', date: 'January 2025', articles: 12, cover: '/api/placeholder/120/160' },
    { title: 'Fall 2024: Denial Management', date: 'October 2024', articles: 10, cover: '/api/placeholder/120/160' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <BookOpen className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Magazine</h1>
          <p className="text-xl text-blue-100">Quarterly publication with industry insights and best practices.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {issues.map((issue, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden flex">
                <div className="w-32 bg-gray-200 flex items-center justify-center">📖</div>
                <div className="p-4 flex-1"><h3 className="text-xl font-bold text-dark">{issue.title}</h3><p className="text-gray-500 text-sm">{issue.date}</p><p className="text-gray-600 mt-2">{issue.articles} articles</p><button className="mt-3 text-primary font-semibold">Read Issue →</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Magazine;