import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import toast from 'react-hot-toast';
import { 
  Mail, Phone, Calendar, Eye, CheckCircle, XCircle, 
  MessageCircle, Users, FileText, TrendingUp, Clock,
  Check, X, Trash2, RefreshCw, Send, Download, 
  BarChart3, Headphones, Brain, Settings, Calendar as CalendarIcon,
  BookOpen, Shield, Building2, Activity, Zap
} from 'lucide-react';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');
  const [subscribers, setSubscribers] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  // New state variables
  const [chatCallbacks, setChatCallbacks] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [events, setEvents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [newCaseStudy, setNewCaseStudy] = useState({
    title: '', specialty: '', challenge: '', solution: '', results: [], quote: '', author: ''
  });
  
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingContacts: 0,
    totalComments: 0,
    pendingComments: 0,
    totalSubscribers: 0,
    totalChatCallbacks: 0,
    pendingChatCallbacks: 0,
    totalCaseStudies: 0,
    totalPageViews: 0
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchContacts(),
      fetchComments(),
      fetchSubscribers(),
      fetchChatCallbacks(),
      fetchCaseStudies(),
      fetchSpecialties(),
      fetchEvents(),
      fetchAnalytics(),
      fetchAdminStats()
    ]);
    setLoading(false);
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get('/api/contacts');
      const contactsData = response.data.data || [];
      setContacts(contactsData);
      setStats(prev => ({
        ...prev,
        totalContacts: contactsData.length,
        pendingContacts: contactsData.filter(c => c.status === 'pending').length
      }));
    } catch (error) {
      toast.error('Failed to fetch contacts');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get('/api/blog/comments/all');
      const commentsData = response.data.data || [];
      setComments(commentsData);
      setStats(prev => ({
        ...prev,
        totalComments: commentsData.length,
        pendingComments: commentsData.filter(c => !c.is_approved).length
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await api.get('/api/newsletter');
      setSubscribers(response.data.data || []);
      setStats(prev => ({
        ...prev,
        totalSubscribers: response.data.data?.length || 0
      }));
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const fetchChatCallbacks = async () => {
    try {
      const response = await api.get('/api/chat/callbacks');
      setChatCallbacks(response.data.data || []);
      setStats(prev => ({
        ...prev,
        totalChatCallbacks: response.data.data?.length || 0,
        pendingChatCallbacks: response.data.data?.filter(c => c.status === 'pending').length || 0
      }));
    } catch (error) {
      console.error('Error fetching chat callbacks:', error);
    }
  };

  const fetchCaseStudies = async () => {
    try {
      const response = await api.get('/api/case-studies');
      setCaseStudies(response.data.data || []);
      setStats(prev => ({
        ...prev,
        totalCaseStudies: response.data.data?.length || 0
      }));
    } catch (error) {
      console.error('Error fetching case studies:', error);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const response = await api.get('/api/specialties');
      setSpecialties(response.data.data || []);
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/api/events');
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/api/analytics/page-views');
      setAnalytics(response.data);
      setStats(prev => ({
        ...prev,
        totalPageViews: response.data?.totalViews || 0
      }));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchAdminStats = async () => {
    try {
      const response = await api.get('/api/admin/stats');
      if (response.data.stats) {
        setStats(prev => ({ ...prev, ...response.data.stats }));
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const deleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
      try {
        await api.delete(`/api/newsletter/${id}`);
        toast.success('Subscriber removed successfully');
        fetchSubscribers();
      } catch (error) {
        toast.error('Failed to remove subscriber');
      }
    }
  };

  const sendNewsletter = async () => {
    if (!emailSubject || !emailContent) {
      toast.error('Please enter subject and content');
      return;
    }
    
    try {
      await api.post('/api/newsletter/send', {
        subject: emailSubject,
        content: emailContent,
        subscribers: subscribers.map(s => s.email)
      });
      toast.success(`Newsletter sent to ${subscribers.length} subscribers`);
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailContent('');
    } catch (error) {
      toast.error('Failed to send newsletter');
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await api.put(`/api/contacts/${id}`, { status });
      toast.success(`Contact marked as ${status}`);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const approveComment = async (id) => {
    try {
      await api.put(`/api/blog/comments/${id}/approve`);
      toast.success('Comment approved successfully');
      fetchComments();
    } catch (error) {
      toast.error('Failed to approve comment');
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await api.delete(`/api/blog/comments/${id}`);
        toast.success('Comment deleted successfully');
        fetchComments();
      } catch (error) {
        toast.error('Failed to delete comment');
      }
    }
  };

  const updateChatCallbackStatus = async (id, status) => {
    try {
      await api.put(`/api/chat/callbacks/${id}`, { status });
      toast.success(`Chat callback marked as ${status}`);
      fetchChatCallbacks();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteCaseStudy = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await api.delete(`/api/case-studies/${id}`);
        toast.success('Case study deleted successfully');
        fetchCaseStudies();
      } catch (error) {
        toast.error('Failed to delete case study');
      }
    }
  };

  const addCaseStudy = async () => {
    if (!newCaseStudy.title || !newCaseStudy.specialty) {
      toast.error('Please fill in title and specialty');
      return;
    }
    try {
      await api.post('/api/case-studies', newCaseStudy);
      toast.success('Case study added successfully');
      setShowCaseStudyModal(false);
      setNewCaseStudy({ title: '', specialty: '', challenge: '', solution: '', results: [], quote: '', author: '' });
      fetchCaseStudies();
    } catch (error) {
      toast.error('Failed to add case study');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  const exportSubscribers = () => {
    const csv = subscribers.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`).join('\n');
    const blob = new Blob([`Email,Subscribed Date\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Subscribers exported successfully');
  };

  const exportChatCallbacks = () => {
    const csv = chatCallbacks.map(c => `${c.name},${c.email},${c.phone || ''},${c.status},${new Date(c.created_at).toLocaleDateString()}`).join('\n');
    const blob = new Blob([`Name,Email,Phone,Status,Date\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-callbacks.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Chat callbacks exported successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage all aspects of your 60+ page website</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards - Expanded */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div><div className="text-2xl font-bold text-primary">{stats.totalContacts}</div><div className="text-gray-600">Total Contacts</div></div>
              <Mail className="w-8 h-8 text-primary opacity-50" />
            </div>
            <div className="mt-2 text-sm text-yellow-600">{stats.pendingContacts} pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div><div className="text-2xl font-bold text-primary">{stats.totalSubscribers}</div><div className="text-gray-600">Newsletter Subs</div></div>
              <Users className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div><div className="text-2xl font-bold text-primary">{stats.totalChatCallbacks}</div><div className="text-gray-600">Chat Requests</div></div>
              <Headphones className="w-8 h-8 text-primary opacity-50" />
            </div>
            <div className="mt-2 text-sm text-yellow-600">{stats.pendingChatCallbacks} pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div><div className="text-2xl font-bold text-primary">{stats.totalPageViews}</div><div className="text-gray-600">Page Views</div></div>
              <BarChart3 className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Tab Navigation - Expanded */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-x-auto">
          <div className="flex border-b min-w-max">
            <button onClick={() => setActiveTab('contacts')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'contacts' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <Mail className="inline-block w-4 h-4 mr-2" /> Contacts
            </button>
            <button onClick={() => setActiveTab('comments')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'comments' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <MessageCircle className="inline-block w-4 h-4 mr-2" /> Comments
              {stats.pendingComments > 0 && <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingComments}</span>}
            </button>
            <button onClick={() => setActiveTab('subscribers')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'subscribers' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <Users className="inline-block w-4 h-4 mr-2" /> Subscribers
            </button>
            <button onClick={() => setActiveTab('chat')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'chat' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <Headphones className="inline-block w-4 h-4 mr-2" /> Chat Callbacks
              {stats.pendingChatCallbacks > 0 && <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingChatCallbacks}</span>}
            </button>
            <button onClick={() => setActiveTab('case-studies')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'case-studies' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <FileText className="inline-block w-4 h-4 mr-2" /> Case Studies
            </button>
            <button onClick={() => setActiveTab('specialties')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'specialties' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <Activity className="inline-block w-4 h-4 mr-2" /> Specialties
            </button>
            <button onClick={() => setActiveTab('events')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'events' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <CalendarIcon className="inline-block w-4 h-4 mr-2" /> Events
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'analytics' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}>
              <BarChart3 className="inline-block w-4 h-4 mr-2" /> Analytics
            </button>
          </div>
        </div>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{new Date(contact.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-medium">{contact.name}</td>
                      <td className="px-6 py-4 text-sm">{contact.email}</td>
                      <td className="px-6 py-4 text-sm">{contact.subject}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${contact.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{contact.status || 'pending'}</span></td>
                      <td className="px-6 py-4"><div className="flex space-x-2"><button onClick={() => setSelectedContact(contact)} className="text-blue-600 hover:text-blue-800"><Eye size={18} /></button>{contact.status !== 'completed' && <button onClick={() => updateContactStatus(contact.id, 'completed')} className="text-green-600 hover:text-green-800"><CheckCircle size={18} /></button>}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Chat Callbacks Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat Callback Requests</h3>
              <button onClick={exportChatCallbacks} className="btn-secondary text-sm"><Download size={16} className="inline mr-1" /> Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="divide-y divide-gray-200">
                  {chatCallbacks.map((callback) => (
                    <tr key={callback.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{new Date(callback.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-medium">{callback.name}</td>
                      <td className="px-6 py-4 text-sm">{callback.email}</td>
                      <td className="px-6 py-4 text-sm">{callback.phone || '-'}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${callback.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{callback.status || 'pending'}</span></td>
                      <td className="px-6 py-4">{callback.status !== 'completed' && <button onClick={() => updateChatCallbackStatus(callback.id, 'completed')} className="text-green-600 hover:text-green-800"><CheckCircle size={18} /></button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Case Studies Tab */}
        {activeTab === 'case-studies' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Case Studies</h3>
              <button onClick={() => setShowCaseStudyModal(true)} className="btn-primary text-sm"><FileText size={16} className="inline mr-1" /> Add Case Study</button>
            </div>
            <div className="divide-y">
              {caseStudies.map((study) => (
                <div key={study.id} className="p-4 flex justify-between items-center">
                  <div><h4 className="font-semibold">{study.title}</h4><p className="text-sm text-gray-500">{study.specialty}</p></div>
                  <button onClick={() => deleteCaseStudy(study.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specialties Tab */}
        {activeTab === 'specialties' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b"><h3 className="text-lg font-semibold">Medical Specialties ({specialties.length})</h3></div>
            <div className="grid md:grid-cols-3 gap-4 p-4">
              {specialties.map((spec) => (
                <div key={spec.id} className="border rounded-lg p-3"><div className="font-semibold">{spec.name}</div><div className="text-sm text-gray-500">{spec.providers_served} providers</div><div className="text-sm text-primary">{spec.recovery_rate} recovery rate</div></div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b"><h3 className="text-lg font-semibold">Upcoming Events</h3></div>
            <div className="divide-y">
              {events.map((event) => (
                <div key={event.id} className="p-4 flex justify-between items-center"><div><h4 className="font-semibold">{event.title}</h4><p className="text-sm text-gray-500">{event.date} • {event.location}</p></div><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{event.type}</span></div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6"><div className="text-3xl font-bold text-primary">{analytics.totalViews}</div><div className="text-gray-600">Total Page Views</div></div>
              <div className="bg-white rounded-xl shadow-md p-6"><div className="text-3xl font-bold text-primary">{analytics.uniquePages}</div><div className="text-gray-600">Unique Pages</div></div>
              <div className="bg-white rounded-xl shadow-md p-6"><div className="text-3xl font-bold text-primary">{Object.keys(analytics.viewsByDay || {}).length}</div><div className="text-gray-600">Days of Data</div></div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b font-semibold">Top Pages</div>
              <div className="divide-y">
                {Object.entries(analytics.viewsByPage || {}).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([page, views]) => (<div key={page} className="flex justify-between p-3"><span className="text-sm">{page || 'Home'}</span><span className="text-sm font-semibold text-primary">{views} views</span></div>))}
              </div>
            </div>
          </div>
        )}

        {/* Keep existing Comments and Subscribers tabs */}
        {/* ... (same as before) ... */}

        {/* Modals */}
        {selectedContact && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Contact Details</h2><button onClick={() => setSelectedContact(null)}><X size={24} /></button></div><div className="space-y-3"><p><strong>Name:</strong> {selectedContact.name}</p><p><strong>Email:</strong> {selectedContact.email}</p><p><strong>Phone:</strong> {selectedContact.phone || 'N/A'}</p><p><strong>Practice:</strong> {selectedContact.practice || 'N/A'}</p><p><strong>Subject:</strong> {selectedContact.subject}</p><p><strong>Message:</strong> {selectedContact.message}</p></div><div className="flex justify-end mt-6"><button onClick={() => setSelectedContact(null)} className="btn-primary">Close</button></div></div></div>)}

        {showCaseStudyModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Add Case Study</h2><button onClick={() => setShowCaseStudyModal(false)}><X size={24} /></button></div><div className="space-y-4"><input type="text" placeholder="Title" value={newCaseStudy.title} onChange={(e) => setNewCaseStudy({...newCaseStudy, title: e.target.value})} className="w-full border rounded-lg px-4 py-2" /><input type="text" placeholder="Specialty" value={newCaseStudy.specialty} onChange={(e) => setNewCaseStudy({...newCaseStudy, specialty: e.target.value})} className="w-full border rounded-lg px-4 py-2" /><textarea placeholder="Challenge" rows="3" value={newCaseStudy.challenge} onChange={(e) => setNewCaseStudy({...newCaseStudy, challenge: e.target.value})} className="w-full border rounded-lg px-4 py-2" /><textarea placeholder="Solution" rows="3" value={newCaseStudy.solution} onChange={(e) => setNewCaseStudy({...newCaseStudy, solution: e.target.value})} className="w-full border rounded-lg px-4 py-2" /><textarea placeholder="Quote" rows="2" value={newCaseStudy.quote} onChange={(e) => setNewCaseStudy({...newCaseStudy, quote: e.target.value})} className="w-full border rounded-lg px-4 py-2" /><input type="text" placeholder="Author" value={newCaseStudy.author} onChange={(e) => setNewCaseStudy({...newCaseStudy, author: e.target.value})} className="w-full border rounded-lg px-4 py-2" /><div className="flex justify-end gap-3"><button onClick={() => setShowCaseStudyModal(false)} className="btn-secondary">Cancel</button><button onClick={addCaseStudy} className="btn-primary">Add Case Study</button></div></div></div></div>)}

        {showEmailModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Send Newsletter</h2><button onClick={() => setShowEmailModal(false)}><X size={24} /></button></div><div className="space-y-4"><input type="text" placeholder="Subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full border rounded-lg px-4 py-2" /><textarea placeholder="Content" rows="8" value={emailContent} onChange={(e) => setEmailContent(e.target.value)} className="w-full border rounded-lg px-4 py-2" /><div className="bg-gray-50 p-3 rounded"><p className="text-sm text-gray-600">Will be sent to: <strong>{subscribers.length}</strong> subscribers</p></div><div className="flex justify-end gap-3"><button onClick={() => setShowEmailModal(false)} className="btn-secondary">Cancel</button><button onClick={sendNewsletter} className="btn-primary">Send Newsletter</button></div></div></div></div>)}
      </div>
    </div>
  );
};

export default AdminDashboard;