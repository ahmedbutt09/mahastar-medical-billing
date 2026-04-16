import React from 'react';
import { ClipboardCheck, FileCheck, DollarSign, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Patient Registration',
    desc: 'Eligibility verification, benefits check, authorization management'
  },
  {
    icon: FileCheck,
    title: 'Claims Submission',
    desc: 'Scrubbing, coding, and electronic submission to payers'
  },
  {
    icon: DollarSign,
    title: 'Payment Posting',
    desc: 'EOB processing, payment reconciliation, patient statements'
  },
  {
    icon: TrendingUp,
    title: 'AR Follow-up',
    desc: 'Denial management, appeals, and aged receivable recovery'
  }
];

const RCMProcess = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">Our Proven RCM Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined approach to maximize your revenue at every step
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">0{idx + 1}</div>
              <h3 className="text-lg font-bold text-dark mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RCMProcess;