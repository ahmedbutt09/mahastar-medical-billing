import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';

const ForInHouseTeams = () => {
  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Handshake className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Services for In-House Billing Teams</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Let's work together to drive up revenue. We augment your existing team, not replace them.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Co-Managed RCM Model</h2>
              <p className="text-gray-600 mb-6">We work alongside your existing billing team, handling overflow work, denials, and aged AR while you retain control.</p>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Co-Managed Solutions</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Augment your team, not replace them</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Flexible hours based on your needs</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Same workflows and systems you already use</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />No long-term commitment required</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Co-Management Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A co-management specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Practice Name" className="w-full border rounded-lg px-4 py-2" required />
                <input type="text" placeholder="Current Team Size" className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" required />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Discuss Co-Management →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule Co-Management Discussion</Link>
      </section>
    </div>
  );
};

export default ForInHouseTeams;