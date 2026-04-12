import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Calendar, MessageCircle } from 'lucide-react';

const Comments = ({ postId, comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.author_name || !newComment.content) {
      toast.error('Please provide your name and comment');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/api/blog/comments', {
        post_id: postId,
        ...newComment
      });
      toast.success('Comment submitted for approval!');
      setNewComment({ author_name: '', author_email: '', content: '' });
    } catch (error) {
      toast.error('Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <MessageCircle className="mr-2" size={24} />
        Comments ({comments.length})
      </h3>

      {/* Comments List */}
      <div className="space-y-6 mb-8">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-semibold">{comment.author_name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {new Date(comment.created_at).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="text-xl font-semibold mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={newComment.author_name}
                onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (will not be published)
              </label>
              <input
                type="email"
                value={newComment.author_email}
                onChange={(e) => setNewComment({ ...newComment, author_email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              rows="4"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Your comment will be visible after approval.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Comments;