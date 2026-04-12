import React from 'react';
import { Mail, Link2 } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SocialShare = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || 'Check out this article');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url || window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-semibold text-gray-700">Share:</span>
      <button
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={16} />
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={16} />
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={16} />
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.email)}
        className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
        aria-label="Share via Email"
      >
        <Mail size={16} />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        aria-label="Copy link"
      >
        <Link2 size={16} />
      </button>
    </div>
  );
};

export default SocialShare;