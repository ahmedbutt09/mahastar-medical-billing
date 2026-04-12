import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    setSubscribing(true);
    try {
      await axios.post('/api/subscribe', { email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">MahaStar</h3>
            <p className="text-gray-300">
              Medical Billing & IT Solutions LLC
            </p>
            <p className="text-gray-300 mt-2">
              Trusted by healthcare providers in UK & US
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Services</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-3">Subscribe to get updates on healthcare billing insights</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-3 py-2 rounded-lg text-gray-900 text-sm"
                required
              />
              <button 
                type="submit" 
                disabled={subscribing}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition text-sm disabled:opacity-50"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">info@mahastar.com</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com/mahastar" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com/mahastar" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com/company/mahastar" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-300">
            &copy; 2024 MahaStar Medical Billing & IT Solutions LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;