import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Healthcare Providers' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '15+', label: 'Years Experience' },
    { number: '3', label: 'Global Offices' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality medical billing services'
    },
    {
      icon: Users,
      title: 'Client-First',
      description: 'Your success is our priority, we work as an extension of your team'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Focused on maximizing your revenue and reducing costs'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Honest, transparent, and ethical business practices'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About MahaStar
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted partner in medical billing and healthcare IT solutions
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-gray-600 mb-4">
                Founded in 2010, MahaStar Medical Billing & IT Solutions LLC has grown to become 
                a trusted partner for healthcare providers across the UK and United States.
              </p>
              <p className="text-gray-600 mb-4">
                We understand the challenges healthcare practices face in managing revenue cycles 
                while providing quality patient care. That's why we've dedicated ourselves to 
                creating efficient, technology-driven solutions that maximize reimbursements and 
                minimize administrative burdens.
              </p>
              <p className="text-gray-600">
                Today, we serve over 500 healthcare providers, processing thousands of claims 
                monthly with industry-leading accuracy and speed.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-6">
                To empower healthcare providers with innovative billing solutions that optimize 
                revenue, reduce costs, and allow them to focus on what matters most - patient care.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p>
                To be the global leader in medical billing and healthcare IT, setting new standards 
                for accuracy, efficiency, and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <value.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;