import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { 
  Mail, Users, FileText, BarChart3, Headphones, Layout, 
  DollarSign, Briefcase, Home, LogOut, Menu, X as CloseIcon,
  BookOpen
} from 'lucide-react';

// Import manager components
import DynamicPagesManager from '../components/admin/DynamicPagesManager';
import CaseStudiesManager from '../components/admin/CaseStudiesManager';
import ResourcesManager from '../components/admin/ResourcesManager';
import PricingManager from '../components/admin/PricingManager';
import LeadershipManager from '../components/admin/LeadershipManager';
import CareersManager from '../components/admin/CareersManager';
import ContactsManager from '../components/admin/ContactsManager';
import SubscribersManager from '../components/admin/SubscribersManager';
import ChatCallbacksManager from '../components/admin/ChatCallbacksManager';
import AnalyticsManager from '../components/admin/AnalyticsManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingContacts: 0,
    totalSubscribers: 0,
    totalChatCallbacks: 0,
    pendingChatCallbacks: 0,
    totalDynamicPages: 0,
    totalPageViews: 0
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
    try {
      const [contactsRes, subscribersRes, chatRes, pagesRes] = await Promise.all([
        api.get('/api/contacts'),
        api.get('/api/newsletter'),
        api.get('/api/chat/callbacks'),
        api.get('/api/dynamic-pages')
      ]);

      const contacts = contactsRes.data.data || [];
      const subscribers = subscribersRes.data.data || [];
      const chatCallbacks = chatRes.data.data || [];
      const dynamicPages = pagesRes.data.data || [];
      
      setStats({
        totalContacts: contacts.length,
        pendingContacts: contacts.filter(c => c.status === 'pending').length,
        totalSubscribers: subscribers.length,
        totalChatCallbacks: chatCallbacks.length,
        pendingChatCallbacks: chatCallbacks.filter(c => c.status === 'pending').length,
        totalDynamicPages: dynamicPages.length,
        totalPageViews: 12500
      });
      
      setRecentContacts(contacts.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'contacts', label: 'Contacts', icon: Mail, badge: stats.pendingContacts },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'chat', label: 'Chat Callbacks', icon: Headphones, badge: stats.pendingChatCallbacks },
    { id: 'dynamic-pages', label: 'Dynamic Pages', icon: Layout, badge: stats.totalDynamicPages },
    { id: 'case-studies', label: 'Case Studies', icon: FileText },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. FIXED MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-dark text-white z-[60] px-4 flex items-center justify-between shadow-lg">
        <h1 className="text-lg font-bold">MahaStar Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 active:bg-white/10 rounded-lg">
          {sidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* 2. OVERLAY - Fixed Z-index to sit between header and sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-[40] md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 3. SIDEBAR - Added h-full and fixed desktop/mobile logic */}
        <aside className={`
          fixed top-0 bottom-0 left-0 z-[50] 
          w-72 bg-dark text-white transition-transform duration-300 ease-in-out
          flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:h-screen md:sticky
        `}>
          <div className="p-6 border-b border-white/10">
            <h1 className="text-xl font-bold">MahaStar Admin</h1>
            <p className="text-xs text-gray-400 mt-1">CMS Dashboard</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon size={18} />
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/10 bg-dark/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-all duration-200 text-gray-400 hover:text-red-400"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* 4. MAIN CONTENT - Added overflow-hidden to prevent layout shift */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Spacer for the fixed mobile header */}
          <div className="h-16 md:hidden" />
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'overview' && (
                <>
                  <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Quick stats and recent activity.</p>
                  </div>
                  
                  {/* Grid Fix: Ensures 1 col on small mobile, 2 on tablet, 4 on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Total Contacts" value={stats.totalContacts} sub={stats.pendingContacts} icon={Mail} />
                    <StatCard title="Newsletter" value={stats.totalSubscribers} icon={Users} />
                    <StatCard title="Dynamic Pages" value={stats.totalDynamicPages} icon={Layout} />
                    <StatCard title="Page Views" value={stats.totalPageViews.toLocaleString()} icon={BarChart3} />
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50">
                      <h2 className="text-lg font-bold text-gray-900">Recent Contacts</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                          <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {recentContacts.map(contact => (
                            <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm text-gray-600">{new Date(contact.created_at).toLocaleDateString()}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  contact.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {contact.status || 'pending'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Dynamic Content Sections */}
              {activeTab === 'contacts' && <ContactsManager />}
              {activeTab === 'subscribers' && <SubscribersManager />}
              {activeTab === 'chat' && <ChatCallbacksManager />}
              {activeTab === 'dynamic-pages' && <DynamicPagesManager />}
              {activeTab === 'case-studies' && <CaseStudiesManager />}
              {activeTab === 'resources' && <ResourcesManager />}
              {activeTab === 'pricing' && <PricingManager />}
              {activeTab === 'leadership' && <LeadershipManager />}
              {activeTab === 'careers' && <CareersManager />}
              {activeTab === 'analytics' && <AnalyticsManager />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper component for cleaner code
const StatCard = ({ title, value, sub, icon: Icon }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {sub !== undefined && <p className="text-xs text-yellow-600 mt-1">{sub} pending</p>}
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>
);

export default AdminDashboard;