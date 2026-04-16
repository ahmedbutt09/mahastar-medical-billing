import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Shield, DollarSign, BarChart3, FileCheck, Activity, Clock, Users, Zap, CheckCircle } from 'lucide-react';

const RCMSoftware = () => {
  const softwareProducts = [
    { icon: Activity, title: 'Denial Management Software', desc: 'Automated denial tracking and appeal workflow' },
    { icon: DollarSign, title: 'AR Management Software', desc: 'Real-time AR aging analysis and follow-up' },
    { icon: FileCheck, title: 'Claim Scrubbing Tool', desc: 'Pre-submission error detection with 99% accuracy' },
    { icon: Shield, title: 'Patient Cost Estimator', desc: 'Accurate out-of-pocket cost estimates' },
    { icon: Clock, title: 'Patient Eligibility Automation', desc: 'Real-time verification before patient visit' },
    { icon: BarChart3, title: 'EOB to ERA Converter', desc: 'Automatic EOB-to-ERA reconciliation' },
    { icon: TrendingUp, title: 'Revenue Analytics System', desc: 'Predictive revenue forecasting' },
    { icon: Settings, title: 'Workflow Management App', desc: 'Customizable RCM workflow automation' },
    { icon: Users, title: 'Remote Resource Management', desc: 'Manage distributed billing teams' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Settings className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Software Suite</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Enterprise-grade RCM software tools to automate and optimize your revenue cycle.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProducts.map((product, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <product.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-bold text-dark mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.desc}</p>
                <button className="mt-3 text-primary text-sm font-semibold hover:underline">Learn More →</button>
              </div>
            ))}
          </div>

          <div className="bg-primary text-white rounded-xl p-8 text-center mt-8">
            <h3 className="text-2xl font-bold mb-2">See Our Software in Action</h3>
            <Link to="/contact" className="bg-accent px-6 py-2 rounded-lg inline-block mt-4">Request Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RCMSoftware;