import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, DollarSign, BarChart3, Activity, Zap, CheckCircle } from 'lucide-react';

const AISolutions = () => {
  const aiProducts = [
    { icon: Activity, title: 'Denial Management AI', desc: 'Predict denials before submission with 89% accuracy', color: 'from-blue-500 to-cyan-500' },
    { icon: DollarSign, title: 'Patient Pricing AI', desc: 'Real-time patient cost estimates and payment plans', color: 'from-green-500 to-teal-500' },
    { icon: Shield, title: 'Credentialing AI', desc: 'Automated payer enrollment and document verification', color: 'from-purple-500 to-pink-500' },
    { icon: BarChart3, title: 'RCM Analytics AI', desc: 'Predictive insights for revenue optimization', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Brain className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">AI-Powered RCM Solutions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Suite of exclusive RCM process-specific AI systems designed to maximize revenue.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {aiProducts.map((product, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
                <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-dark mb-4 text-center">How Our AI Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center"><div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary font-bold">1</div><h4 className="font-semibold">Data Ingestion</h4><p className="text-sm text-gray-600">Learn from millions of historical claims</p></div>
              <div className="text-center"><div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary font-bold">2</div><h4 className="font-semibold">Pattern Recognition</h4><p className="text-sm text-gray-600">Identify denial patterns and revenue leakage</p></div>
              <div className="text-center"><div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary font-bold">3</div><h4 className="font-semibold">Predictive Action</h4><p className="text-sm text-gray-600">Real-time recommendations and automation</p></div>
            </div>
          </div>

          <div className="bg-primary text-white rounded-xl p-8 text-center mt-8">
            <h3 className="text-2xl font-bold mb-2">Ready to leverage AI for your RCM?</h3>
            <Link to="/contact" className="bg-accent px-6 py-2 rounded-lg inline-block mt-4 hover:bg-secondary transition">Schedule AI Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AISolutions;