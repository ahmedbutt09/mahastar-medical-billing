import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  FileCheck, 
  Shield,
  Database,
  Headphones
} from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: TrendingUp,
      title: 'Medical Billing & Coding',
      description: 'Accurate medical coding and timely billing services to maximize your revenue cycle.',
      features: ['CPT/ICD-10 Coding', 'Charge Entry', 'Payment Posting', 'Patient Statements']
    },
    {
      icon: Activity,
      title: 'Revenue Cycle Management',
      description: 'End-to-end RCM solutions to optimize your practice\'s financial performance.',
      features: ['Patient Registration', 'Insurance Verification', 'Claims Submission', 'Payment Collection']
    },
    {
      icon: FileCheck,
      title: 'Insurance Claims Processing',
      description: 'Fast and accurate claims submission with real-time tracking and follow-up.',
      features: ['Electronic Claims', 'Paper Claims', 'Claim Tracking', 'Appeals Management']
    },
    {
      icon: Shield,
      title: 'Denial Management',
      description: 'Proactive denial management to reduce claim rejections and recover revenue.',
      features: ['Denial Analysis', 'Root Cause Fixes', 'Appeals Processing', 'Prevention Strategies']
    },
    {
      icon: Database,
      title: 'Healthcare IT Support',
      description: 'Comprehensive IT solutions for healthcare practices and hospitals.',
      features: ['EHR Implementation', 'Practice Management', 'Data Security', 'Technical Support']
    },
    {
      icon: Headphones,
      title: '24/7 Patient Support',
      description: 'Round-the-clock patient support for billing inquiries and payment assistance.',
      features: ['Phone Support', 'Email Support', 'Portal Access', 'Payment Plans']
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive medical billing and healthcare IT solutions tailored to your practice
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <div key={index} className="card hover:shadow-2xl">
                <service.icon className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Revenue Cycle?</h2>
          <p className="text-xl text-gray-600 mb-8">Contact us today for a free consultation</p>
          <a href="/contact" className="btn-primary inline-block">Get Started</a>
        </div>
      </section>
    </div>
  );
};

export default Services;