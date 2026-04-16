import React from 'react';

const clients = [
  '🏥 Texas Medical Center',
  '🏨 UCLA Health',
  '💊 Mayo Clinic Partners',
  '🩺 Cleveland Clinic',
  '🏥 Johns Hopkins Medicine',
  '💊 Kaiser Permanente'
];

const ClientLogos = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 text-sm mb-6">TRUSTED BY LEADING HEALTHCARE ORGANIZATIONS</p>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
          {clients.map((client, idx) => (
            <div key={idx} className="text-lg font-semibold text-gray-400">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;