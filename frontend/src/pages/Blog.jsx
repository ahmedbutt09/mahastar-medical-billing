import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. Import your custom api instance
import api from '../api'; 
import toast from 'react-hot-toast';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchTags();
    fetchPosts();
  }, [selectedCategory, selectedTag]);

  const fetchTags = async () => {
    try {
      // 2. Use api.get
      const response = await api.get('/api/tags');
      setAllTags(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = '/api/blog/posts';
      const params = new URLSearchParams();
      
      if (selectedCategory !== "All") {
        params.append('category', selectedCategory);
      }
      if (selectedTag) {
        params.append('tag', selectedTag);
      }
      
      // 3. Use api.get with the params object for cleaner code
      const response = await api.get(url, { params });
      
      const postsData = response.data.data || [];
      setPosts(postsData);
      
      const uniqueCategories = ['All', ...new Set(postsData.map(post => post.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      // 4. Use api.post for newsletter subscription
      await api.post('/api/subscribe', { email });
      toast.success('Subscribed successfully!');
      e.target.reset();
    } catch (error) {
      toast.error('Failed to subscribe');
    }
  };

  const handleTagClick = (tagName) => {
    if (selectedTag === tagName) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tagName);
      setSelectedCategory("All");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedTag(null);
  };

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Healthcare Insights Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert insights on medical billing, RCM, and healthcare technology
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="text-center mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Filter by Category</h3>
          </div>
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category && !selectedTag
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      {allTags.length > 0 && (
        <section className="py-6 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="text-center mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Filter by Tags</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedTag === tag.name
                      ? 'bg-secondary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Active Filters Display */}
      {(selectedCategory !== "All" || selectedTag) && (
        <section className="py-4 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== "All" && (
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  Category: {selectedCategory}
                  <button
                    onClick={() => handleCategoryClick("All")}
                    className="ml-2 hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  Tag: #{selectedTag}
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="ml-2 hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found with the selected filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag(null);
                }}
                className="mt-4 text-primary hover:text-secondary"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="card hover:shadow-2xl transition-all duration-300">
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-xl -mt-6 -mx-6 mb-4"
                      style={{ width: 'calc(100% + 3rem)' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400?text=Healthcare+Blog';
                      }}
                    />
                  )}
                  <div className="mb-4">
                    <span className="text-xs text-primary font-semibold bg-blue-50 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} />
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8">Get the latest healthcare billing insights delivered to your inbox</p>
          <form 
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              required
            />
            <button type="submit" className="btn-secondary !bg-white !text-primary hover:!bg-opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;