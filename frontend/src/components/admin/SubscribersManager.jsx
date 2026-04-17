import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Download, Trash2, Send, X, Mail, Calendar } from 'lucide-react';

const SubscribersManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/newsletter');
      setSubscribers(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
      try {
        await api.delete(`/api/newsletter/${id}`);
        toast.success('Subscriber removed');
        fetchSubscribers();
      } catch (error) {
        toast.error('Failed to remove subscriber');
      }
    }
  };

  const exportSubscribers = () => {
    const csv = subscribers.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`).join('\n');
    const blob = new Blob([`Email,Subscribed Date\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Subscribers exported');
  };

  const sendNewsletter = async () => {
    if (!emailSubject || !emailContent) {
      toast.error('Please enter subject and content');
      return;
    }
    
    setSending(true);
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
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading subscribers...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Newsletter Subscribers</h2>
          <p className="text-gray-500 text-sm mt-1">{subscribers.length} total subscribers</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowEmailModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Send size={16} /> Send Newsletter
          </button>
          <button onClick={exportSubscribers} className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subscribed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{subscriber.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(subscriber.subscribed_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteSubscriber(subscriber.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Send Newsletter Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">Send Newsletter</h2>
              <button onClick={() => setShowEmailModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                  placeholder="Newsletter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML supported)</label>
                <textarea
                  rows="10"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-primary focus:border-primary font-mono text-sm"
                  placeholder="<h1>Hello Subscribers!</h1><p>Your newsletter content here...</p>"
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Will be sent to: <strong>{subscribers.length}</strong> subscribers</p>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowEmailModal(false)} className="btn-secondary">Cancel</button>
                <button onClick={sendNewsletter} disabled={sending} className="btn-primary flex items-center gap-2">
                  {sending ? 'Sending...' : <><Send size={16} /> Send Newsletter</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribersManager;