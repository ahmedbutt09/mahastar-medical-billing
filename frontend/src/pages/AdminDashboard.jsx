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
      {/* Mobile Header - Visible only on mobile */}
<div className="md:hidden fixed top-0 left-0 right-0 bg-dark text-white z-[70] px-4 py-3 flex items-center justify-between shadow-lg h-16">
  <h1 className="text-lg font-bold">MahaStar Admin</h1>
  <button 
    onClick={() => setSidebarOpen(!sidebarOpen)} 
    className="p-2 active:bg-white/10 rounded-lg relative z-[80]"
  >
    {sidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
  </button>
</div>

      <div className="flex flex-1 items-stretch">
        {/* 2. OVERLAY - Fixed Z-index to sit between header and sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-[40] md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 3. SIDEBAR - Added h-full and fixed desktop/mobile logic */}
        <aside className={`
  /* Mobile: Fixed overlay | Desktop: Sticky sidebar */
  fixed md:sticky top-0 left-0 z-[60]
  
  /* Transition and Width */
  w-72 h-screen bg-dark text-white transition-transform duration-300 ease-in-out
  
  /* Scrolling Logic */
  overflow-y-auto shadow-xl flex-shrink-0
  
  /* Visibility Logic */
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
`}>
  {/* Mobile Header Spacer */}
  <div className="h-16 md:hidden" /> 

  <div className="p-6 border-b border-white/10 flex-shrink-0">
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

       {/* Main Content Area */}
<main className="flex-1 min-w-0 bg-gray-50 flex flex-col">
  
  {/* 1. MOBILE HEADER SPACER 
      This prevents your content from hiding under the fixed "MahaStar Admin" black bar on mobile.
  */}
  <div className="h-16 md:hidden flex-shrink-0" />
  {/* 2. SCROLLABLE CONTENT WRAPPER */}
  <div className="flex-1 overflow-x-hidden">
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      
      {/* Overview Section */}
      {activeTab === 'overview' && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
          </div>
          
          {/* Grid fix: 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.totalContacts}</div>
                  <div className="text-sm text-gray-600">Total Contacts</div>
                </div>
                <Mail className="w-8 h-8 text-primary/20" />
              </div>
            </div>
            {/* ... Repeat for other 3 stats cards ... */}
          </div>

          {/* 3. TABLE CONTAINER FIX
              'overflow-x-auto' allows the table to scroll sideways on small phones 
              WITHOUT pushing the rest of the dashboard off-screen.
          */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Recent Contacts</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentContacts.map(contact => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm whitespace-nowrap">{new Date(contact.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
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

      {/* Other Manager Tabs */}
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