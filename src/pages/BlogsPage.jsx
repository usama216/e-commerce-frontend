import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, FileText, Loader2 } from 'lucide-react';
import { fetchBlogs } from '../api';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchBlogs();
        if (!cancelled) setBlogs(data.blogs || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load blogs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const imageUrl = (b) => {
    const u = b.cover_image_url || '';
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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="mt-4 inline-block text-biomed-teal font-medium hover:underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Health Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay informed with expert health insights, wellness tips, nutritional guidance, and healthcare updates from BIOMED Innovation Pharmaceuticals.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-600">
          {[
            'Nutrition and wellness',
            'Immune health support',
            'Brain and spine health',
            'Vitamins and supplements',
            'Preventive healthcare',
            'Lifestyle and fitness',
            'Healthcare awareness',
          ].map((topic) => (
            <li
              key={topic}
              className="bg-biomed-teal/10 text-biomed-navy px-3 py-1 rounded-full font-medium"
            >
              {topic}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
          Explore evidence-based health information designed to help you make informed decisions about your wellbeing.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No blog posts yet. Check back soon!</p>
          <Link to="/" className="mt-4 inline-block text-biomed-teal font-medium hover:underline">Back to home</Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-biomed-teal/30 transition-all"
            >
              <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                {blog.cover_image_url ? (
                  <img
                    src={imageUrl(blog)}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-biomed-teal/10 to-biomed-navy/10">
                    <FileText className="w-14 h-14 text-biomed-teal/50" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-biomed-teal bg-biomed-teal/10 px-2 py-0.5 rounded mb-2">
                  {blog.category || 'Health'}
                </span>
                <h2 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-biomed-teal transition-colors">
                  {blog.title}
                </h2>
                {blog.excerpt && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{blog.excerpt}</p>
                )}
                <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(blog.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {blog.read_time_minutes ?? 5} min read
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
