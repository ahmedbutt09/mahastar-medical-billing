import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, FileCheck, DollarSign, TrendingUp, 
  Calendar, Shield, Activity, BarChart3, ArrowRight,
  CheckCircle, Loader
} from 'lucide-react';
import api from '../api';

const RCMProcess = () => {
  const [processImage, setProcessImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Supabase image URL (your uploaded image)
  const supabaseImageUrl = 'https://foqmcizermoatgwknwfc.supabase.co/storage/v1/object/public/images/process/rcm-process-infographic.png';

  useEffect(() => {
    // Fetch the image URL from database (optional - can also use direct URL)
    fetchProcessImage();
  }, []);

  const fetchProcessImage = async () => {
    try {
      // Try to get from database first
      const response = await api.get('/api/dynamic-page/services/rcm');
      if (response.data.success && response.data.data?.process_image) {
        setProcessImage(response.data.data.process_image);
      } else {
        // Fallback to direct Supabase URL
        setProcessImage(supabaseImageUrl);
      }
    } catch (error) {
      console.error('Error fetching process image:', error);
      setProcessImage(supabaseImageUrl);
    } finally {
      setLoading(false);
    }
  };

  // Left side steps (first 4)
  const leftSteps = [
    {
      number: '01',
      icon: ClipboardCheck,
      title: 'Patient Registration',
      description: 'Collect patient demographics, verify insurance eligibility, obtain necessary authorizations'
    },
    {
      number: '02',
      icon: Shield,
      title: 'Insurance Verification',
      description: 'Confirm coverage & benefits, check patient responsibility, secure pre-authorizations'
    },
    {
      number: '03',
      icon: FileCheck,
      title: 'Charge Capture',
      description: 'Record diagnosis, procedures, and services with accurate ICD-10, CPT, HCPCS coding'
    },
    {
      number: '04',
      icon: Activity,
      title: 'Claims Submission',
      description: 'Clean claim review, submit electronic claims (837P), timely filing within payer deadlines'
    }
  ];

  // Right side steps (last 4)
  const rightSteps = [
    {
      number: '05',
      icon: DollarSign,
      title: 'Payment Posting',
      description: 'Monitor claim status, post payments & adjustments, manage EOBs & remittances'
    },
    {
      number: '06',
      icon: TrendingUp,
      title: 'Denial Management',
      description: 'Identify & analyze denials, correct and resubmit claims, appeal when necessary'
    },
    {
      number: '07',
      icon: Calendar,
      title: 'Patient Billing',
      description: 'Generate patient statements, offer multiple payment options, follow up on outstanding balances'
    },
    {
      number: '08',
      icon: BarChart3,
      title: 'Reporting & Analytics',
      description: 'Track key metrics (AR, A/R Days, Collection Rate, Denial Rate), monitor performance'
    }
  ];

  const benefits = [
    { title: 'End-to-End', subtitle: 'Process' },
    { title: 'Improved', subtitle: 'Cash Flow' },
    { title: 'Higher', subtitle: 'Collections' },
    { title: 'Compliant &', subtitle: 'Efficient' }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Loader className="w-8 h-8 text-primary animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Our Proven RCM Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end revenue cycle management that delivers measurable results
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Three Column Layout: Left Steps | Center Image | Right Steps */}
        <div className="grid lg:grid-cols-3 gap-6 items-center">
          {/* Left Side - Steps 1-4 */}
          <div className="space-y-4">
            {leftSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-primary font-bold mb-1">{step.number}</div>
                  <h3 className="font-semibold text-dark text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Image from Supabase */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full"></div>
            <div className="relative z-10 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 shadow-xl">
              <img 
                src={processImage}
                alt="MahaStar RCM Process - 8 Step Revenue Cycle Management"
                className="rounded-xl w-full object-contain"
              />
            </div>
          </div>

          {/* Right Side - Steps 5-8 */}
          <div className="space-y-4">
            {rightSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-primary font-bold mb-1">{step.number}</div>
                  <h3 className="font-semibold text-dark text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Strip Below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-200">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-bold text-dark text-lg">{benefit.title}</div>
              <div className="text-sm text-gray-500">{benefit.subtitle}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link 
            to="/services/rcm" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-all group"
          >
            Learn More About Our RCM Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RCMProcess;