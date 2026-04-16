import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    date: 'April 27, 2024',
    title: 'MahaStar Partners with Leading Health System for Strategic RCM',
    excerpt: 'MahaStar announced a strategic partnership to transform healthcare revenue cycle management...',
    link: '#'
  },
  {
    date: 'April 15, 2024',
    title: 'Introducing KYAR - Know Your Accounts Receivable',
    excerpt: 'Pioneering a revenue integrity analysis approach for healthcare leaders...',
    link: '#'
  },
  {
    date: 'March 28, 2024',
    title: 'MahaStar Achieves SOC2 Type II Compliance',
    excerpt: 'Reinforcing our commitment to data security and compliance standards...',
    link: '#'
  }
];

const NewsPress = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">News & Press Release</h2>
          <p className="text-xl text-gray-600">Latest updates from MahaStar Medical Billing</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-2 text-sm text-primary mb-3">
                <Calendar size={16} />
                <span>{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.excerpt}</p>
              <Link to={item.link} className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition">
                Read more → <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPress;