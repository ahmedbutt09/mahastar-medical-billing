import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Eye, CheckCircle, X, Download, Trash2, Mail, Phone, Calendar, MessageCircle } from 'lucide-react';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/contacts');
      setContacts(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/contacts/${id}`, { status });
      toast.success(`Contact marked as ${status}`);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.delete(`/api/contacts/${id}`);
        toast.success('Contact deleted');
        fetchContacts();
      } catch (error) {
        toast.error('Failed to delete contact');
      }
    }
  };

  const exportContacts = () => {
    const csv = contacts.map(c => 
      `${c.name},${c.email},${c.phone || ''},${c.subject},${c.status},${new Date(c.created_at).toLocaleDateString()}`
    ).join('\n');
    const blob = new Blob([`Name,Email,Phone,Subject,Status,Date\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Contacts exported');
  };

  const filteredContacts = contacts.filter(c => {
    if (filter === 'pending') return c.status === 'pending';
    if (filter === 'completed') return c.status === 'completed';
    return true;
  });

  if (loading) {
    return <div className="text-center py-12">Loading contacts...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Contact Submissions</h2>
          <p className="text-gray-500 text-sm mt-1">Manage all contact form inquiries</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All ({contacts.length})</option>
            <option value="pending">Pending ({contacts.filter(c => c.status === 'pending').length})</option>
            <option value="completed">Completed ({contacts.filter(c => c.status === 'completed').length})</option>
          </select>
          <button onClick={exportContacts} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{new Date(contact.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium">{contact.name}</td>
                <td className="px-6 py-4 text-sm">{contact.email}</td>
                <td className="px-6 py-4 text-sm">{contact.subject}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    contact.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contact.status || 'pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedContact(contact)} className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    {contact.status !== 'completed' && (
                      <button onClick={() => updateStatus(contact.id, 'completed')} className="text-green-600 hover:text-green-800">
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button onClick={() => deleteContact(contact.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">Contact Details</h2>
              <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium">{selectedContact.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Practice</label>
                  <p className="font-medium">{selectedContact.practice || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Subject</label>
                  <p className="font-medium">{selectedContact.subject}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date</label>
                  <p className="font-medium">{new Date(selectedContact.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Message</label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedContact.message}</p>
              </div>
              {selectedContact.response && (
                <div>
                  <label className="text-sm text-gray-500">Response</label>
                  <p className="mt-1 p-3 bg-green-50 rounded-lg">{selectedContact.response}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelectedContact(null)} className="btn-secondary">Close</button>
              {selectedContact.status !== 'completed' && (
                <button onClick={() => {
                  updateStatus(selectedContact.id, 'completed');
                  setSelectedContact(null);
                }} className="btn-primary">Mark as Completed</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;