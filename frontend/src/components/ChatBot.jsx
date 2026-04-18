import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Headphones, User, Mail, Phone } from 'lucide-react';
import api from '../api';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '👋 Hi! Welcome to MahaStar Medical Billing. I\'m your AI assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [messageId, setMessageId] = useState(2);

  useEffect(() => {
    // Generate unique conversation ID
    if (!conversationId) {
      setConversationId('conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { id: messageId, type, text, timestamp: new Date() }]);
    setMessageId(prev => prev + 1);
  };

  const sendToBackend = async (message) => {
    try {
      const response = await api.post('/api/chatbot/message', {
        message: message,
        conversationId: conversationId
      });
      
      if (response.data.success) {
        addMessage('bot', response.data.response);
        
        if (response.data.requiresHuman) {
          setTimeout(() => {
            setShowAgentForm(true);
            addMessage('bot', "👨‍💼 I'll connect you with a live specialist. Please fill out the form below so they can assist you better.");
          }, 500);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('bot', "I'm having trouble connecting. Please try again or email us at info@mahastar.com");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    addMessage('user', inputMessage);
    const userMsg = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    await sendToBackend(userMsg);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) {
      alert('Please enter your name and email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save lead to database
      const response = await api.post('/api/chat/lead', {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        message: userInfo.message || 'Chatbot conversation - requested human agent',
        conversationId: conversationId
      });
      
      if (response.data.success) {
        addMessage('bot', `✅ **Thank you ${userInfo.name}!**\n\nAn RCM specialist will contact you at **${userInfo.email}** within 24 hours.\n\nIn the meantime, feel free to ask me any questions!`);
        setShowAgentForm(false);
        setUserInfo({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      addMessage('bot', "I've recorded your request. A specialist will reach out to you soon. You can also email us directly at info@mahastar.com");
      setShowAgentForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTalkToHuman = () => {
    setShowAgentForm(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowAgentForm(false);
  };

  // Quick reply suggestions
  const quickReplies = [
    { label: '💰 Pricing', text: 'Tell me about your pricing' },
    { label: '📋 Services', text: 'What services do you offer?' },
    { label: '🩺 Coding', text: 'Tell me about medical coding' },
    { label: '📄 Credentialing', text: 'How does credentialing work?' },
    { label: '📊 AR Management', text: 'AR management services' },
    { label: '⚠️ Denials', text: 'Denial management help' },
    { label: '🔌 EHR Integration', text: 'EHR integration options' },
    { label: '📅 Demo', text: 'Schedule a demo' }
  ];

  // Chat button (when closed)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-xl hover:bg-secondary transition-all z-50 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
      </button>
    );
  }

  return (
    <div 
  className={`fixed z-[9999] transition-all duration-300 ease-in-out
    /* Mobile: Full screen or bottom anchored */
    bottom-0 right-0 left-0 h-[80vh] w-full 
    /* Desktop: Side anchored */
    md:bottom-6 md:right-6 md:left-auto md:w-[380px] md:h-[600px]
    bg-white shadow-2xl border border-gray-200 overflow-hidden
    ${isOpen ? 'flex' : 'hidden'} flex-col
    /* Mobile specific rounded corners */
    rounded-t-2xl md:rounded-2xl
  `}
  style={{ 
    display: isOpen ? 'flex' : 'none',
    maxHeight: isMinimized ? '48px' : 'calc(100vh - 100px)' 
  }}
>
 {/* Header */}
<div className="bg-gradient-to-r from-dark to-primary text-white px-4 py-4 md:py-3 flex justify-between items-center flex-shrink-0">
  <div className="flex items-center gap-2">
    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
    <span className="font-semibold text-sm md:text-base">MahaStar Support</span>
  </div>
  <div className="flex gap-2">
    <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-white/20 rounded-md p-2 transition">
      {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
    </button>
    <button onClick={handleCloseChat} className="hover:bg-white/20 rounded-md p-2 transition">
      <X size={16} />
    </button>
  </div>
</div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3" style={{ minHeight: 0 }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 whitespace-pre-wrap ${
                  msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                }`}>
                  <div className="text-sm">{msg.text}</div>
                  <div className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Agent Contact Form */}
          {showAgentForm && (
            <div className="border-t border-gray-200 p-4 bg-white shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-dark">Connect with a Specialist</h3>
                <button 
                  onClick={() => setShowAgentForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleAgentSubmit} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-primary focus:border-primary"
                  />
                </div>
                <textarea
                  placeholder="How can we help you?"
                  rows="2"
                  value={userInfo.message}
                  onChange={(e) => setUserInfo({...userInfo, message: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request →'}
                </button>
              </form>
            </div>
          )}

         {/* Quick Reply Buttons */}
<div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
  <div className="flex overflow-x-auto no-scrollbar gap-2 mb-3 pb-1">
    {quickReplies.map((reply, idx) => (
      <button
        key={idx}
        onClick={() => {
          setInputMessage(reply.text);
          setTimeout(() => handleSendMessage(), 10);
        }}
        className="text-[10px] md:text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition whitespace-nowrap"
      >
        {reply.label}
      </button>
    ))}
  </div>
            
            {/* Input Area */}
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-primary focus:border-primary resize-none"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-primary text-white rounded-xl px-4 py-2 hover:bg-secondary transition disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-2 text-center text-xs text-gray-400 flex justify-center gap-4 flex-shrink-0">
            <span>⚡ AI-powered responses</span>
            <button onClick={handleTalkToHuman} className="text-primary hover:underline flex items-center gap-1">
              <Headphones size={12} /> Talk to human
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;