import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import { fetchBlogByIdOrSlug } from '../api';

const BlogDetailPage = () => {
  const { idOrSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!idOrSlug) return;
    (async () => {
      try {
        const data = await fetchBlogByIdOrSlug(idOrSlug);
        if (!cancelled) setBlog(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Blog not found');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [idOrSlug]);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const imageUrl = (b) => {
    const u = b?.cover_image_url || '';
    if (u.startsWith('http')) return u;
    if (u.startsWith('/')) return `${window.location.origin}${u}`;
    return u;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600">{error || 'Blog not found'}</p>
        <Link to="/blogs" className="mt-4 inline-flex items-center gap-2 text-biomed-teal font-medium hover:underline">
          <ArrowLeft size={18} />
          Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-biomed-teal font-medium mb-8"
      >
        <ArrowLeft size={18} />
        Back to blogs
      </Link>

      <header className="mb-8">
        <span className="inline-block text-sm font-semibold text-biomed-teal bg-biomed-teal/10 px-3 py-1 rounded-full mb-4">
          {blog.category || 'Health'}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <Calendar size={18} />
            {formatDate(blog.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={18} />
            {blog.read_time_minutes ?? 5} min read
          </span>
        </div>
      </header>

      {blog.cover_image_url && (
        <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
          <img
            src={imageUrl(blog)}
            alt=""
            className="w-full h-auto object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      {blog.excerpt && (
        <p className="text-xl text-gray-600 mb-8 font-medium">{blog.excerpt}</p>
      )}

      <div
        className="blog-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-biomed-teal prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-biomed-teal prose-blockquote:bg-biomed-teal/5 prose-blockquote:py-1 prose-img:rounded-lg prose-img:shadow-md"
        dangerouslySetInnerHTML={{
          __html: blog.content && blog.content.trim()
            ? (blog.content.trim().startsWith('<') ? blog.content.trim() : `<p>${blog.content.trim().replace(/\n/g, '<br />')}</p>`)
            : '<p class="text-gray-500">No content yet.</p>',
        }}
      />

      <div className="mt-12 pt-8 border-t">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-biomed-teal font-medium hover:underline"
        >
          <ArrowLeft size={18} />
          All blogs
        </Link>
      </div>
    </article>
  );
};

export default BlogDetailPage;
