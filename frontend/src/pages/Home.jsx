import React from 'react';
import Testimonials from '../components/Testimonials';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  CheckCircle,
  DollarSign,
  FileCheck,
  Activity,
  Headphones
} from 'lucide-react';

const Home = () => {
  const services = [
    { icon: TrendingUp, title: 'Medical Billing & Coding', desc: 'Accurate coding and timely billing for maximum reimbursement' },
    { icon: Activity, title: 'Revenue Cycle Management', desc: 'End-to-end RCM solutions to optimize your revenue' },
    { icon: FileCheck, title: 'Insurance Claims Processing', desc: 'Fast and accurate claims submission and tracking' },
    { icon: Shield, title: 'Denial Management', desc: 'Reduce denials and recover lost revenue effectively' },
  ];

  const benefits = [
    { icon: DollarSign, title: 'Maximize Revenue', desc: 'Increase collections by up to 30%' },
    { icon: Clock, title: 'Reduce Administrative Workload', desc: 'Save 20+ hours per week' },
    { icon: CheckCircle, title: 'Accurate Claims Processing', desc: '99% first-pass acceptance rate' },
    { icon: Shield, title: 'Secure & HIPAA-Compliant', desc: 'Enterprise-grade security' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-dark to-primary text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trusted Medical Billing & Healthcare IT Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              for UK & US Providers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary !bg-white !text-primary hover:!bg-opacity-90">
                Get Started Today
              </Link>
              <Link to="/services" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive medical billing and IT solutions tailored to your practice
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card text-center">
                <service.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose MahaStar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with us for smarter healthcare billing solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <benefit.icon className="w-14 h-14 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
<Testimonials />

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Maximize Your Revenue?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of healthcare providers who trust MahaStar for their billing needs
          </p>
          <Link to="/contact" className="btn-secondary !bg-white !text-primary hover:!bg-opacity-90">
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;