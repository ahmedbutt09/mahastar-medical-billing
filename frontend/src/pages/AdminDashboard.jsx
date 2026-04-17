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
  DollarSign, HelpCircle, Book, Video, FileQuestion, Layout, Globe, LogOut,
  Briefcase, Menu, X as CloseIcon
} from 'lucide-react';

// Import manager components
import PageContentManager from '../components/admin/PageContentManager';
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

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      const contactsRes = await api.get('/api/contacts');
      const contacts = contactsRes.data.data || [];
      
      const subscribersRes = await api.get('/api/newsletter');
      const subscribers = subscribersRes.data.data || [];
      
      const chatRes = await api.get('/api/chat/callbacks');
      const chatCallbacks = chatRes.data.data || [];
      
      const pagesRes = await api.get('/api/dynamic-pages');
      const dynamicPages = pagesRes.data.data || [];
      
      setStats({
        totalContacts: contacts.length,
        pendingContacts: contacts.filter(c => c.status === 'pending').length,
        totalSubscribers: subscribers.length,
        totalChatCallbacks: chatCallbacks.length,
        pendingChatCallbacks: chatCallbacks.filter(c => c.status === 'pending').length,
        totalCaseStudies: 0,
        totalPageViews: 12500,
        totalDynamicPages: dynamicPages.length,
        totalResources: 0,
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

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home, color: 'text-blue-500' },
    { id: 'contacts', label: 'Contacts', icon: Mail, badge: stats.pendingContacts, color: 'text-green-500' },
    { id: 'subscribers', label: 'Subscribers', icon: Users, color: 'text-purple-500' },
    { id: 'chat', label: 'Chat Callbacks', icon: Headphones, badge: stats.pendingChatCallbacks, color: 'text-orange-500' },
    { id: 'dynamic-pages', label: 'Dynamic Pages', icon: Layout, badge: stats.totalDynamicPages, color: 'text-indigo-500' },
    { id: 'case-studies', label: 'Case Studies', icon: FileText, color: 'text-teal-500' },
    { id: 'resources', label: 'Resources', icon: BookOpen, color: 'text-pink-500' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, color: 'text-yellow-500' },
    { id: 'leadership', label: 'Leadership', icon: Users, color: 'text-cyan-500' },
    { id: 'careers', label: 'Careers', icon: Briefcase, color: 'text-rose-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-emerald-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-dark text-white z-30 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">MahaStar Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-dark text-white z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:static md:w-72 flex-shrink-0
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">MahaStar Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Content Management System</p>
        </div>
        
        {/* Close button on mobile */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
        >
          <CloseIcon size={24} />
        </button>
        
        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
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
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-white' : item.color} />
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              {item.badge > 0 && (
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${activeTab === item.id ? 'bg-white text-primary' : 'bg-red-500 text-white'}
                `}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-dark">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-all duration-200 text-gray-300 hover:text-red-400"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Desktop Header */}
        <div className="hidden md:block bg-white border-b sticky top-0 z-10">
          <div className="px-8 py-4">
            <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your website.</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-dark">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your website.</p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalContacts}</div>
                      <div className="text-sm text-gray-600">Total Contacts</div>
                    </div>
                    <Mail className="w-8 h-8 md:w-10 md:h-10 text-primary/30" />
                  </div>
                  <div className="mt-2 text-xs text-yellow-600">{stats.pendingContacts} pending</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalSubscribers}</div>
                      <div className="text-sm text-gray-600">Newsletter Subs</div>
                    </div>
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-primary/30" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalDynamicPages}</div>
                      <div className="text-sm text-gray-600">Dynamic Pages</div>
                    </div>
                    <Layout className="w-8 h-8 md:w-10 md:h-10 text-primary/30" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalPageViews.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Page Views</div>
                    </div>
                    <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-primary/30" />
                  </div>
                </div>
              </div>

              {/* Recent Contacts */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-6 border-b bg-gray-50">
                  <h2 className="text-lg md:text-xl font-bold text-dark">Recent Contacts</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentContacts.map(contact => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-4 md:px-6 py-4 text-sm">{new Date(contact.created_at).toLocaleDateString()}</td>
                          <td className="px-4 md:px-6 py-4 font-medium">{contact.name}</td>
                          <td className="px-4 md:px-6 py-4 text-sm">{contact.email}</td>
                          <td className="px-4 md:px-6 py-4 text-sm">{contact.subject}</td>
                          <td className="px-4 md:px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              contact.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
            </div>
          )}

          {/* Other Tabs */}
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
      </main>
    </div>
  );
};

export default AdminDashboard;