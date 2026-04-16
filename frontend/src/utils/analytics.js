import api from '../api';

export const trackPageView = async (pageUrl) => {
  try {
    // Get visitor IP (optional - your backend can also get this)
    const visitorIp = '';
    const userAgent = navigator.userAgent;
    
    await api.post('/api/page-view', {
      page_url: pageUrl,
      visitor_ip: visitorIp,
      user_agent: userAgent
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};