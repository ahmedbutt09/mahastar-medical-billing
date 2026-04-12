import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import SocialShare from '../components/SocialShare';
import Comments from '../components/Comments';
import toast from 'react-hot-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  // Define fetchTags first
  const fetchTags = async (postId) => {
    try {
      const response = await axios.get(`/api/blog/posts/${postId}/tags`);
      setTags(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setTags([]);
    }
  };

  // Define fetchPost
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/blog/posts/${slug}`);
      if (response.data.success && response.data.data) {
        setPost(response.data.data);
        // Fetch tags after post is loaded
        await fetchTags(response.data.data.id);
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load blog post');
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to trigger fetch
  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn-primary inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center text-primary hover:text-secondary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-primary" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-primary" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-primary" />
                <span>{post.read_time}</span>
              </div>
            </div>
            <SocialShare title={post.title} url={window.location.href} />
          </div>
          
          {post.image_url && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Healthcare+Blog';
                }}
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-dark prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:mb-2 prose-strong:text-primary prose-a:text-primary hover:prose-a:text-secondary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags Section */}
        {tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Tags:</span>
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/blog/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Section */}
        {post.category && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Category:</span>
            <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
          </div>
        )}

        {/* Comments Section */}
        {post.id && (
          <Comments postId={post.id} comments={post.comments || []} />
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Help with Medical Billing?</h3>
          <p className="text-lg mb-6 opacity-95">Let our experts handle your revenue cycle management</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us Today
            </Link>
            <Link 
              to="/services" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;