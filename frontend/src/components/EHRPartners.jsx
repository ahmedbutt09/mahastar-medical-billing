import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Cloud, Shield, Zap, CheckCircle, ArrowRight, Activity, FileText, Users, Clock, BarChart3, Brain } from 'lucide-react';

// Color palette for each EHR brand
const brandColors = {
  Epic: { bg: 'from-blue-600/20 to-blue-600/5', text: 'text-blue-600', icon: Activity },
  Cerner: { bg: 'from-emerald-600/20 to-emerald-600/5', text: 'text-emerald-600', icon: Database },
  eClinicalWorks: { bg: 'from-purple-600/20 to-purple-600/5', text: 'text-purple-600', icon: FileText },
  Athenahealth: { bg: 'from-teal-600/20 to-teal-600/5', text: 'text-teal-600', icon: Users },
  NextGen: { bg: 'from-orange-600/20 to-orange-600/5', text: 'text-orange-600', icon: Clock },
  Allscripts: { bg: 'from-rose-600/20 to-rose-600/5', text: 'text-rose-600', icon: BarChart3 },
  Kareo: { bg: 'from-cyan-600/20 to-cyan-600/5', text: 'text-cyan-600', icon: Activity },
  PracticeFusion: { bg: 'from-indigo-600/20 to-indigo-600/5', text: 'text-indigo-600', icon: Brain }
};

const ehrPartners = [
  { 
    name: 'Epic', 
    slug: 'epic',
    description: 'Enterprise-wide EHR integration for seamless RCM',
    features: ['Resolute Billing', 'Cadence', 'MyChart'],
    certified: 'Gold Certified'
  },
  { 
    name: 'Cerner', 
    slug: 'cerner',
    description: 'PowerChart and RevElate optimization',
    features: ['PowerChart', 'RevElate', 'CommunityWorks'],
    certified: 'Platinum Partner'
  },
  { 
    name: 'eClinicalWorks', 
    slug: 'eclinicalworks',
    description: 'Complete ECW billing and practice management',
    features: ['ECW Billing', 'eBO', 'Patient Portal'],
    certified: 'Certified Partner'
  },
  { 
    name: 'Athenahealth', 
    slug: 'athenahealth',
    description: 'AthenaCollector and Clinicals optimization',
    features: ['AthenaCollector', 'AthenaClinicals', 'AthenaNet'],
    certified: 'Certified Partner'
  },
  { 
    name: 'NextGen', 
    slug: 'nextgen',
    description: 'NextGen Enterprise billing solutions',
    features: ['NextGen Billing', 'Practice Management', 'EDR'],
    certified: 'Certified Partner'
  },
  { 
    name: 'Allscripts', 
    slug: 'allscripts',
    description: 'Allscripts Professional and TouchWorks',
    features: ['Allscripts Pro', 'TouchWorks', 'Acute Care'],
    certified: 'Certified Partner'
  },
  { 
    name: 'Kareo', 
    slug: 'kareo',
    description: 'Kareo clinical and billing platform',
    features: ['Kareo Billing', 'Kareo Clinical', 'Patient Collect'],
    certified: 'Certified Partner'
  },
  { 
    name: 'Practice Fusion', 
    slug: 'practice-fusion',
    description: 'Practice Fusion EHR optimization',
    features: ['Practice Fusion EHR', 'Billing Module', 'ePrescribing'],
    certified: 'Certified Partner'
  }
];

const EHRPartners = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">EHR Integration Experts</span>
          </div>
          <h2 className="text-4xl font-bold text-dark mb-4">
            Seamless EHR Integration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We integrate with all major EHR systems for seamless data flow and optimized revenue cycle
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* EHR Grid - Professional Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ehrPartners.map((ehr, idx) => {
            const colors = brandColors[ehr.name] || brandColors.Epic;
            const IconComponent = colors.icon;
            
            return (
              <Link 
                key={idx} 
                to={`/ehr/${ehr.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Brand-colored Logo Placeholder */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition`}>
                    <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  
                  {/* Title and Certification */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold text-dark group-hover:${colors.text} transition`}>
                      {ehr.name}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {ehr.certified}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3">
                    {ehr.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ehr.features.map((feature, fIdx) => (
                      <span key={fIdx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Link */}
                  <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Integration Benefits */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-1">Cloud-Based Integration</h3>
              <p className="text-sm text-gray-500">Secure, real-time data sync with your EHR</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-1">HIPAA Compliant</h3>
              <p className="text-sm text-gray-500">Enterprise-grade security for patient data</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-1">Rapid Implementation</h3>
              <p className="text-sm text-gray-500">Typical integration in 7-14 days</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-all"
          >
            Need EHR Integration? Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EHRPartners;