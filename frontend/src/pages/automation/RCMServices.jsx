import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Clock, DollarSign, FileCheck, Calendar, Activity, CreditCard, Camera } from 'lucide-react';

const RCMServices = () => {
  const automationServices = [
    { icon: Shield, title: 'Eligibility Verification Automation', desc: 'Real-time patient coverage checks before appointment' },
    { icon: Activity, title: 'Denial Management Automation', desc: 'Auto-appeal and tracking system' },
    { icon: DollarSign, title: 'Accounts Receivable Automation', desc: 'Auto-follow-up on aging claims' },
    { icon: Calendar, title: 'Appointment Scheduling Automation', desc: 'Smart scheduling with insurance verification' },
    { icon: FileCheck, title: 'Medical Coding Automation', desc: 'AI-assisted code suggestion engine' },
    { icon: CreditCard, title: 'Payment Posting Automation', desc: 'Auto-reconciliation of EOBs and payments' },
    { icon: Camera, title: 'Charge Capture Automation', desc: 'Mobile charge capture with real-time validation' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Zap className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Automation Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Automate repetitive RCM tasks and focus on what matters — patient care.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {automationServices.map((service, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl shadow-md">
                <service.icon className="w-10 h-10 text-primary flex-shrink-0" />
                <div><h3 className="font-bold text-dark">{service.title}</h3><p className="text-gray-600 text-sm">{service.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="bg-primary text-white rounded-xl p-8 text-center mt-8">
            <h3 className="text-2xl font-bold mb-2">Ready to Automate Your RCM?</h3>
            <Link to="/contact" className="bg-accent px-6 py-2 rounded-lg inline-block mt-4">Start Automation Assessment</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RCMServices;