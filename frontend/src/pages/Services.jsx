import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, FileCheck, Shield, Database, Headphones, Loader } from 'lucide-react';
import api from '../api';

const iconMap = {
  TrendingUp, Activity, FileCheck, Shield, Database, Headphones
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, contentRes] = await Promise.all([
          api.get('/services'),
          api.get('/page-content/services')
        ]);
        
        if (servicesRes.data.success) setServices(servicesRes.data.data);
        if (contentRes.data.success) setPageContent(contentRes.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Dynamic Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {pageContent?.hero_title || 'Our Services'}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {pageContent?.hero_subtitle || 'Comprehensive medical billing and healthcare IT solutions'}
          </p>
        </div>
      </section>

      {/* Services Grid - From Database */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon_name] || TrendingUp;
              const features = Array.isArray(service.features) ? service.features : JSON.parse(service.features || '[]');
              return (
                <div key={service.id} className="card hover:shadow-2xl transition-shadow">
                  <Icon className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            {pageContent?.cta_title || 'Ready to Optimize Your Revenue Cycle?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {pageContent?.cta_text || 'Contact us today for a free consultation'}
          </p>
          <a href={pageContent?.cta_button_link || '/contact'} className="btn-primary inline-block">
            {pageContent?.cta_button_text || 'Get Started'}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;