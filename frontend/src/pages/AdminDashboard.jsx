import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { 
  Mail, Phone, Calendar, Eye, CheckCircle, XCircle, 
  MessageCircle, Users, FileText, TrendingUp, Clock,
  Check, X, Trash2, RefreshCw, Send, Download, 
  BarChart3, Headphones, Brain, Settings, Calendar as CalendarIcon,
  BookOpen, Shield, Building2, Activity, Zap, Home,
  DollarSign, HelpCircle, Book, Video, FileQuestion, Layout, Globe, LogOut
} from 'lucide-react';

// Import manager components
import PageContentManager from '../components/admin/PageContentManager';
import DynamicPagesManager from '../components/admin/DynamicPagesManager';
import CaseStudiesManager from '../components/admin/CaseStudiesManager';
import ResourcesManager from '../components/admin/ResourcesManager';
import PricingManager from '../components/admin/PricingManager';
import LeadershipManager from '../components/admin/LeadershipManager';
import CareersManager from '../components/admin/CareersManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingContacts: 0,
    totalSubscribers: 0,
    totalChatCallbacks: 0,
    pendingChatCallbacks: 0,
    totalCaseStudies: 0,
    totalPageViews: 0,
    totalDynamicPages: 0,
    totalResources: 0,
    totalBlogPosts: 0
  });
  
  const [recentContacts, setRecentContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = () => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchStats(),
      fetchRecentContacts()
    ]);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      // Fetch contacts count
      const contactsRes = await api.get('/api/contacts');
      const contacts = contactsRes.data.data || [];
      
      // Fetch subscribers count
      const subscribersRes = await api.get('/api/newsletter');
      const subscribers = subscribersRes.data.data || [];
      
      // Fetch chat callbacks
      const chatRes = await api.get('/api/chat/callbacks');
      const chatCallbacks = chatRes.data.data || [];
      
      // Fetch dynamic pages count
      const pagesRes = await api.get('/api/dynamic-pages');
      const dynamicPages = pagesRes.data.data || [];
      
      // Fetch resources count
      const resourcesRes = await api.get('/api/resources/whitepapers');
      const resources = resourcesRes.data.data || [];
      
      setStats({
        totalContacts: contacts.length,
        pendingContacts: contacts.filter(c => c.status === 'pending').length,
        totalSubscribers: subscribers.length,
        totalChatCallbacks: chatCallbacks.length,
        pendingChatCallbacks: chatCallbacks.filter(c => c.status === 'pending').length,
        totalCaseStudies: 0,
        totalPageViews: 12500,
        totalDynamicPages: dynamicPages.length,
        totalResources: resources.length,
        totalBlogPosts: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentContacts = async () => {
    try {
      const response = await api.get('/api/contacts');
      setRecentContacts((response.data.data || []).slice(0, 5));
    } catch (error) {
      console.error('Error fetching recent contacts:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-dark text-white z-20">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">MahaStar Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Content Management System</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Home size={18} /> Overview
          </button>
          <button onClick={() => setActiveTab('contacts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'contacts' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Mail size={18} /> Contacts {stats.pendingContacts > 0 && <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">{stats.pendingContacts}</span>}
          </button>
          <button onClick={() => setActiveTab('subscribers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'subscribers' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Users size={18} /> Subscribers
          </button>
          <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'chat' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Headphones size={18} /> Chat Callbacks {stats.pendingChatCallbacks > 0 && <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">{stats.pendingChatCallbacks}</span>}
          </button>
          <button onClick={() => setActiveTab('dynamic-pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'dynamic-pages' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Layout size={18} /> Dynamic Pages <span className="ml-auto text-xs text-gray-400">{stats.totalDynamicPages}</span>
          </button>
          <button onClick={() => setActiveTab('case-studies')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'case-studies' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <FileText size={18} /> Case Studies
          </button>
          <button onClick={() => setActiveTab('resources')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'resources' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <BookOpen size={18} /> Resources
          </button>
          <button onClick={() => setActiveTab('pricing')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'pricing' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <DollarSign size={18} /> Pricing
          </button>
          <button onClick={() => setActiveTab('leadership')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'leadership' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Users size={18} /> Leadership
          </button>
          <button onClick={() => setActiveTab('careers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'careers' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <Briefcase size={18} /> Careers
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'analytics' ? 'bg-primary' : 'hover:bg-white/10'}`}>
            <BarChart3 size={18} /> Analytics
          </button>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-red-400">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-bold text-dark mb-8">Dashboard Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">{stats.totalContacts}</div>
                    <div className="text-gray-600">Total Contacts</div>
                  </div>
                  <Mail className="w-10 h-10 text-primary/30" />
                </div>
                <div className="mt-2 text-sm text-yellow-600">{stats.pendingContacts} pending</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">{stats.totalSubscribers}</div>
                    <div className="text-gray-600">Newsletter Subscribers</div>
                  </div>
                  <Users className="w-10 h-10 text-primary/30" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">{stats.totalDynamicPages}</div>
                    <div className="text-gray-600">Dynamic Pages</div>
                  </div>
                  <Layout className="w-10 h-10 text-primary/30" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">{stats.totalPageViews}</div>
                    <div className="text-gray-600">Total Page Views</div>
                  </div>
                  <BarChart3 className="w-10 h-10 text-primary/30" />
                </div>
              </div>
            </div>

            {/* Recent Contacts */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-dark">Recent Contacts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentContacts.map(contact => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{new Date(contact.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-medium">{contact.name}</td>
                        <td className="px-6 py-4 text-sm">{contact.email}</td>
                        <td className="px-6 py-4 text-sm">{contact.subject}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${contact.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {contact.status || 'pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && <ContactsManager />}
        
        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && <SubscribersManager />}
        
        {/* Chat Callbacks Tab */}
        {activeTab === 'chat' && <ChatCallbacksManager />}
        
        {/* Dynamic Pages Tab */}
        {activeTab === 'dynamic-pages' && <DynamicPagesManager />}
        
        {/* Case Studies Tab */}
        {activeTab === 'case-studies' && <CaseStudiesManager />}
        
        {/* Resources Tab */}
        {activeTab === 'resources' && <ResourcesManager />}
        
        {/* Pricing Tab */}
        {activeTab === 'pricing' && <PricingManager />}
        
        {/* Leadership Tab */}
        {activeTab === 'leadership' && <LeadershipManager />}
        
        {/* Careers Tab */}
        {activeTab === 'careers' && <CareersManager />}
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && <AnalyticsManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;