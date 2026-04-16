import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Headphones } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '👋 Hi! Welcome to MahaStar Medical Billing. How can I help you today?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '', message: '' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [messageId, setMessageId] = useState(2);

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

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('pricing') || msg.includes('cost') || msg.includes('price')) {
      return "💰 We offer 4 pricing models:\n• End-to-End RCM: 3.5-6.5%\n• Partial RCM: Custom\n• Co-Managed: $45-65/hr\n• FTE Model: $2,500-4,500/mo\n\nWant a custom quote?";
    }
    if (msg.includes('demo') || msg.includes('consultation')) {
      setShowAgentForm(true);
      return "📅 I'll connect you with a specialist! Please fill out the form below.";
    }
    if (msg.includes('coding')) {
      return "🩺 Our coding services include 99.2% accuracy, AAPC-certified coders, and 15+ specialties. Want a free coding audit?";
    }
    if (msg.includes('credentialing')) {
      return "📄 Get credentialed in 42 days (industry avg: 90+ days). We handle Medicare, Medicaid, and 50+ commercial payers.";
    }
    if (msg.includes('ar') || msg.includes('accounts receivable')) {
      return "📊 Our AR team recovers aged claims with 94% first-call resolution. Want a free AR assessment?";
    }
    if (msg.includes('denial')) {
      return "⚠️ We reduce denial rates by up to 67% with AI-powered prediction and automated appeals.";
    }
    
    return "I can help with:\n💰 Pricing • 📋 Services • 🩺 Coding • 📄 Credentialing • 📊 AR Management • ⚠️ Denials\n\nWhat would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    addMessage('user', inputMessage);
    const userMsg = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      addMessage('bot', response);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAgentSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) {
      alert('Please enter your name and email');
      return;
    }
    
    console.log('Agent request:', userInfo);
    
    addMessage('bot', `✅ Thanks ${userInfo.name}! An RCM specialist will contact you at ${userInfo.email} within 24 hours.`);
    setShowAgentForm(false);
    setUserInfo({ name: '', email: '', phone: '', message: '' });
  };

  const handleTalkToHuman = () => {
    setShowAgentForm(true);
    addMessage('bot', "👨‍💼 Sure! Please fill out the form below and I'll connect you with a live specialist.");
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowAgentForm(false);
  };

  // Chat button (when closed)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-xl hover:bg-secondary transition-all z-50 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          1
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden" style={{ height: '550px', display: 'flex', flexDirection: 'column' }}>
      {/* Header - STICKY at top, always visible */}
      <div className="bg-gradient-to-r from-dark to-primary text-white px-4 py-3 flex justify-between items-center flex-shrink-0 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">MahaStar Support</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Online</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 rounded-md p-1.5 transition"
            aria-label="Minimize"
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            onClick={handleCloseChat}
            className="hover:bg-white/20 rounded-md p-1.5 transition"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area - Scrollable, with fixed height */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3" style={{ minHeight: 0 }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 whitespace-pre-wrap ${
                  msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
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
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2">
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

          {/* Agent Contact Form - Now scrollable within messages area if needed */}
          {showAgentForm && (
            <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
              <form onSubmit={handleAgentSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                />
                <textarea
                  placeholder="How can we help?"
                  rows="2"
                  value={userInfo.message}
                  onChange={(e) => setUserInfo({...userInfo, message: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                />
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition">
                  Send Request →
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAgentForm(false)}
                  className="w-full text-gray-500 text-sm py-1 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Quick Reply Buttons - Always at bottom */}
          <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {['Pricing', 'Services', 'Demo', 'Credentialing', 'Coding'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    setInputMessage(btn);
                    setTimeout(() => handleSendMessage(), 10);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
                >
                  {btn}
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
            <span>⚡ Usually replies in seconds</span>
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