import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, Calendar, Eye, CheckCircle, XCircle, 
  MessageCircle, Users, FileText, TrendingUp, Clock,
  Check, X, Trash2, RefreshCw, Send, Download } from 'lucide-react';
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
 
const [stats, setStats] = useState({
  totalContacts: 0,
  pendingContacts: 0,
  totalComments: 0,
  pendingComments: 0,
  totalSubscribers: 0
});
  const navigate = useNavigate();

useEffect(() => {
  // Check authentication
  const isAuth = localStorage.getItem('adminAuth');
  if (!isAuth) {
    navigate('/admin');
    return;
  }
  fetchContacts();
  fetchComments();
  fetchSubscribers(); 
}, [navigate]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
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
      // Fetch all comments from all posts
      const response = await axios.get('/api/blog/comments/all');
      const commentsData = response.data.data || [];
      setComments(commentsData);
      setStats(prev => ({
        ...prev,
        totalComments: commentsData.length,
        pendingComments: commentsData.filter(c => !c.is_approved).length
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      // If the endpoint doesn't exist, we'll use a fallback
      setComments([]);
    } finally {
      setLoading(false);
    }
  };
  // Add fetch function after fetchComments
const fetchSubscribers = async () => {
  try {
    const response = await axios.get('/api/newsletter');
    setSubscribers(response.data.data || []);
    setStats(prev => ({
      ...prev,
      totalSubscribers: response.data.data?.length || 0
    }));
  } catch (error) {
    console.error('Error fetching subscribers:', error);
  }
};

  // Add delete subscriber function
const deleteSubscriber = async (id) => {
  if (window.confirm('Are you sure you want to remove this subscriber?')) {
    try {
      await axios.delete(`/api/newsletter/${id}`);
      toast.success('Subscriber removed successfully');
      fetchSubscribers();
    } catch (error) {
      toast.error('Failed to remove subscriber');
    }
  }
};
// Add send newsletter function
const sendNewsletter = async () => {
  if (!emailSubject || !emailContent) {
    toast.error('Please enter subject and content');
    return;
  }
  
  try {
    await axios.post('/api/newsletter/send', {
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

// Add export subscribers function
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

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  const updateContactStatus = async (id, status) => {
    try {
      await axios.put(`/api/contacts/${id}`, { status });
      toast.success(`Contact marked as ${status}`);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const approveComment = async (id) => {
    try {
      await axios.put(`/api/blog/comments/${id}/approve`);
      toast.success('Comment approved successfully');
      fetchComments();
    } catch (error) {
      toast.error('Failed to approve comment');
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`/api/blog/comments/${id}`);
        toast.success('Comment deleted successfully');
        fetchComments();
      } catch (error) {
        toast.error('Failed to delete comment');
      }
    }
  };

  // Add this endpoint to your backend if not exists
  const fetchAllCommentsForAdmin = async () => {
    try {
      // This requires a new backend endpoint
      const response = await axios.get('/api/blog/comments/all');
      return response.data.data;
    } catch (error) {
      // Fallback: fetch comments per post
      const postsResponse = await axios.get('h/api/blog/posts');
      const posts = postsResponse.data.data || [];
      let allComments = [];
      for (const post of posts) {
        const commentsResponse = await axios.get(`/api/blog/comments/${post.id}`);
        allComments = [...allComments, ...(commentsResponse.data.data || [])];
      }
      return allComments;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage contacts, comments, and blog content</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{stats.totalContacts}</div>
                <div className="text-gray-600">Total Contacts</div>
              </div>
              <Mail className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingContacts}</div>
                <div className="text-gray-600">Pending Contacts</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.totalComments}</div>
                <div className="text-gray-600">Total Comments</div>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.pendingComments}</div>
                <div className="text-gray-600">Pending Comments</div>
              </div>
              <Users className="w-8 h-8 text-orange-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Mail className="inline-block w-4 h-4 mr-2" />
              Contact Messages
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'comments'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <MessageCircle className="inline-block w-4 h-4 mr-2" />
              Comments
              {stats.pendingComments > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.pendingComments}
                </span>
              )}
            </button>
            <button
  onClick={() => setActiveTab('subscribers')}
  className={`px-6 py-3 font-semibold transition-colors ${
    activeTab === 'subscribers'
      ? 'text-primary border-b-2 border-primary'
      : 'text-gray-600 hover:text-primary'
  }`}
>
  <Users className="inline-block w-4 h-4 mr-2" />
  Subscribers
  {stats.totalSubscribers > 0 && (
    <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
      {stats.totalSubscribers}
    </span>
  )}
</button>
          </div>
        </div>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">Loading...</td>
                    </tr>
                  ) : contacts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">No contacts found</td>
                    </tr>
                  ) : (
                    contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-medium">{contact.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.subject}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            contact.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {contact.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedContact(contact)}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            {contact.status !== 'completed' && (
                              <button
                                onClick={() => updateContactStatus(contact.id, 'completed')}
                                className="text-green-600 hover:text-green-800"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">Loading...</td>
                    </tr>
                  ) : comments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">No comments found</td>
                    </tr>
                  ) : (
                    comments.map((comment) => (
                      <tr key={comment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{comment.author_name}</div>
                            <div className="text-xs text-gray-500">{comment.author_email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-md">
                            <p className="text-sm text-gray-600 line-clamp-2">{comment.content}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            comment.is_approved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {comment.is_approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {!comment.is_approved && (
                              <button
                                onClick={() => approveComment(comment.id)}
                                className="text-green-600 hover:text-green-800"
                                title="Approve Comment"
                              >
                                <Check size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteComment(comment.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete Comment"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

{activeTab === 'subscribers' && (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-4 border-b flex justify-between items-center">
      <h3 className="text-lg font-semibold">Newsletter Subscribers</h3>
      <div className="flex gap-2">
        <button onClick={exportSubscribers} className="btn-secondary text-sm">
          <Download size={16} className="inline mr-1" />
          Export CSV
        </button>
        <button onClick={() => setShowEmailModal(true)} className="btn-primary text-sm">
          <Send size={16} className="inline mr-1" />
          Send Newsletter
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {subscribers.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center">No subscribers yet</td>
            </tr>
          ) : (
            subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{subscriber.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(subscriber.subscribed_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteSubscriber(subscriber.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove Subscriber"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
        {/* Modal for viewing contact details */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-3">
                <p><strong>Name:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
                <p><strong>Phone:</strong> {selectedContact.phone || 'N/A'}</p>
                <p><strong>Practice:</strong> {selectedContact.practice || 'N/A'}</p>
                <p><strong>Subject:</strong> {selectedContact.subject}</p>
                <p><strong>Message:</strong></p>
                <p className="bg-gray-50 p-3 rounded">{selectedContact.message}</p>
                <p><strong>Submitted:</strong> {new Date(selectedContact.created_at).toLocaleString()}</p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
       
{showEmailModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Send Newsletter</h2>
        <button onClick={() => setShowEmailModal(false)} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Newsletter Subject"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            rows="8"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Write your newsletter content here..."
          />
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Will be sent to: <strong>{subscribers.length}</strong> subscribers</p>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowEmailModal(false)} className="btn-secondary">
            Cancel
          </button>
          <button onClick={sendNewsletter} className="btn-primary">
            Send Newsletter
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default AdminDashboard;