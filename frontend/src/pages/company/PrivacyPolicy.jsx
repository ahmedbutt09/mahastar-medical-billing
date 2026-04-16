import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, including name, email address, phone number, practice information, and any other information you choose to provide.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations including HIPAA requirements.</p>

          <h2>HIPAA Compliance</h2>
          <p>As a Business Associate, we comply with all HIPAA Privacy and Security Rules. We maintain administrative, physical, and technical safeguards to protect Protected Health Information (PHI).</p>

          <h2>Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with your consent, to comply with legal obligations, or with service providers who assist in our operations.</p>

          <h2>Data Security</h2>
          <p>We implement industry-standard security measures including encryption, access controls, and regular security audits. Our systems are SOC2 Type II certified.</p>

          <h2>Your Rights</h2>
          <p>You have the right to access, correct, or request deletion of your personal information. Contact us at privacy@mahastar.com for such requests.</p>

          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@mahastar.com or call (555) 123-4567.</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;