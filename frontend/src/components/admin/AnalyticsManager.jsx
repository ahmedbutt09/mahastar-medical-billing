import React, { useState, useEffect } from 'react';
import api from '../../api';
import { BarChart3, Eye, Users, FileText, TrendingUp, Calendar, Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const AnalyticsManager = () => {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    uniquePages: 0,
    viewsByPage: {},
    viewsByDay: {},
    recentViews: []
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/analytics/page-views?days=${dateRange}`);
      if (response.data.success) {
        setAnalytics(response.data);
      } else {
        // If endpoint doesn't exist, use demo data
        useDemoData();
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Use demo data for now
      useDemoData();
      toast.error('Using demo data. API endpoint not fully configured yet.');
    } finally {
      setLoading(false);
    }
  };

  const useDemoData = () => {
    // Generate demo data for the last 30 days
    const demoViewsByDay = {};
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      demoViewsByDay[dateStr] = Math.floor(Math.random() * 200) + 50;
    }

    const demoViewsByPage = {
      'home': 12500,
      'services/coding': 3450,
      'services/ar-management': 2100,
      'specialties/cardiology': 1890,
      'payers/medicare': 1560,
      'about': 1230,
      'contact': 980,
      'blog': 870,
      'pricing': 760,
      'case-studies': 650
    };

    setAnalytics({
      totalViews: Object.values(demoViewsByPage).reduce((a, b) => a + b, 0),
      uniquePages: Object.keys(demoViewsByPage).length,
      viewsByPage: demoViewsByPage,
      viewsByDay: demoViewsByDay,
      recentViews: []
    });
  };

  const exportAnalytics = () => {
    if (!analytics?.viewsByPage) return;
    
    const csvData = Object.entries(analytics.viewsByPage)
      .map(([page, views]) => `${page},${views}`)
      .join('\n');
    const blob = new Blob([`Page URL,Views\n${csvData}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Analytics exported');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-dark">Analytics Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">Track page views, user engagement, and trends</p>
          </div>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button onClick={exportAnalytics} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-secondary transition">
              <Download size={16} /> Export CSV
            </button>
            <button onClick={fetchAnalytics} className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition">
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{analytics?.totalViews?.toLocaleString() || 0}</div>
              <div className="text-gray-600">Total Page Views</div>
            </div>
            <Eye className="w-10 h-10 text-primary/30" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{analytics?.uniquePages || 0}</div>
              <div className="text-gray-600">Unique Pages</div>
            </div>
            <FileText className="w-10 h-10 text-primary/30" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{Object.keys(analytics?.viewsByDay || {}).length}</div>
              <div className="text-gray-600">Days Tracked</div>
            </div>
            <Calendar className="w-10 h-10 text-primary/30" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">
                {analytics?.totalViews ? Math.round(analytics.totalViews / (Object.keys(analytics?.viewsByDay || {}).length || 1)).toLocaleString() : 0}
              </div>
              <div className="text-gray-600">Avg Daily Views</div>
            </div>
            <TrendingUp className="w-10 h-10 text-primary/30" />
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold text-dark">Top Performing Pages</h3>
          <p className="text-sm text-gray-500 mt-1">Most visited pages on your website</p>
        </div>
        <div className="divide-y">
          {Object.entries(analytics?.viewsByPage || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([page, views]) => (
              <div key={page} className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
                <div>
                  <div className="font-medium text-dark">{page === 'home' ? 'Homepage' : page}</div>
                  <div className="text-xs text-gray-400">/{page}</div>
                </div>
                <div className="text-lg font-semibold text-primary">{views.toLocaleString()} views</div>
              </div>
            ))}
        </div>
      </div>

      {/* Daily Trends */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold text-dark">Daily Page Views Trend</h3>
          <p className="text-sm text-gray-500 mt-1">Last {Object.keys(analytics?.viewsByDay || {}).length} days</p>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            {Object.entries(analytics?.viewsByDay || {})
              .sort((a, b) => new Date(b[0]) - new Date(a[0]))
              .slice(0, 30)
              .map(([date, views]) => {
                const maxViews = Math.max(...Object.values(analytics?.viewsByDay || {}));
                const percentage = (views / maxViews) * 100;
                return (
                  <div key={date} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-600">{date}</div>
                    <div className="flex-1">
                      <div 
                        className="bg-primary/20 h-8 rounded flex items-center justify-end px-2 text-sm font-medium text-primary"
                        style={{ width: `${percentage}%` }}
                      >
                        {views}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsManager;