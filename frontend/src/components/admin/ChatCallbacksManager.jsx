import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Eye, CheckCircle, X, Download, Trash2, Phone, Mail, Calendar, MessageCircle } from 'lucide-react';

const ChatCallbacksManager = () => {
  const [callbacks, setCallbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCallback, setSelectedCallback] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCallbacks();
  }, []);

  const fetchCallbacks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/chat/callbacks');
      setCallbacks(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch chat callbacks');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/chat/callbacks/${id}`, { status });
      toast.success(`Callback marked as ${status}`);
      fetchCallbacks();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const exportCallbacks = () => {
    const csv = callbacks.map(c => 
      `${c.name},${c.email},${c.phone || ''},${c.message || ''},${c.status},${new Date(c.created_at).toLocaleDateString()}`
    ).join('\n');
    const blob = new Blob([`Name,Email,Phone,Message,Status,Date\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_callbacks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Callbacks exported');
  };

  const filteredCallbacks = callbacks.filter(c => {
    if (filter === 'pending') return c.status === 'pending';
    if (filter === 'completed') return c.status === 'completed';
    return true;
  });

  if (loading) {
    return <div className="text-center py-12">Loading chat callbacks...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Chat Callback Requests</h2>
          <p className="text-gray-500 text-sm mt-1">Manage chat callback requests from website visitors</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All ({callbacks.length})</option>
            <option value="pending">Pending ({callbacks.filter(c => c.status === 'pending').length})</option>
            <option value="completed">Completed ({callbacks.filter(c => c.status === 'completed').length})</option>
          </select>
          <button onClick={exportCallbacks} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCallbacks.map((callback) => (
              <tr key={callback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{new Date(callback.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium">{callback.name}</td>
                <td className="px-6 py-4 text-sm">{callback.email}</td>
                <td className="px-6 py-4 text-sm">{callback.phone || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    callback.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {callback.status || 'pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedCallback(callback)} className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    {callback.status !== 'completed' && (
                      <button onClick={() => updateStatus(callback.id, 'completed')} className="text-green-600 hover:text-green-800">
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Callback Details Modal */}
      {selectedCallback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">Chat Callback Details</h2>
              <button onClick={() => setSelectedCallback(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium">{selectedCallback.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedCallback.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium">{selectedCallback.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date</label>
                  <p className="font-medium">{new Date(selectedCallback.created_at).toLocaleString()}</p>
                </div>
              </div>
              {selectedCallback.message && (
                <div>
                  <label className="text-sm text-gray-500">Message</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedCallback.message}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelectedCallback(null)} className="btn-secondary">Close</button>
              {selectedCallback.status !== 'completed' && (
                <button onClick={() => {
                  updateStatus(selectedCallback.id, 'completed');
                  setSelectedCallback(null);
                }} className="btn-primary">Mark as Completed</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCallbacksManager;