import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader, FileText } from 'lucide-react';
import api from '../api';

const NewsPress = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBlogPosts();
  }, []);

  const fetchLatestBlogPosts = async () => {
    try {
      const response = await api.get('/api/blog/posts');
      if (response.data.success && response.data.data) {
        // Get the 3 most recent published blog posts
        const latestPosts = response.data.data.slice(0, 3).map(post => ({
          id: post.id,
          date: new Date(post.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          title: post.title,
          excerpt: post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : 'Read more about this update...'),
          slug: post.slug,
          image: post.image_url
        }));
        setNewsItems(latestPosts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Loader className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-gray-500 mt-2">Loading latest news...</p>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h2 className="text-4xl font-bold text-dark mb-4">News & Press Release</h2>
          <p className="text-gray-500">No news articles available at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">News & Press Release</h2>
          <p className="text-xl text-gray-600">Latest updates from MahaStar Medical Billing</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <div key={item.id || idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              {item.image && (
                <div className="h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                <Link 
                  to={`/blog/${item.slug}`} 
                  className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read more → <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-all"
          >
            View All News & Articles
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsPress;