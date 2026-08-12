import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, ChevronRight, FileText, Loader2 } from 'lucide-react';
import { fetchBlogs } from '../api';

const BlogCarousel = () => {
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs();
        const list = Array.isArray(data) ? data : (data.blogs || []);
        if (!cancelled) setBlogs(list.slice(0, 6));
      } catch {
        if (!cancelled) setBlogs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const duplicatedBlogs = blogs.length > 0 ? [...blogs, ...blogs, ...blogs] : [];

  useEffect(() => {
    if (!isAutoScrolling || loading || blogs.length === 0) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth / 3;

        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 1;
        } else {
          container.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isAutoScrolling, loading, blogs.length]);

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

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

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">WELLNESS BLOG</h2>
          <Link
            to="/blogs"
            className="text-biomed-teal font-semibold hover:text-biomed-navy hover:underline whitespace-nowrap"
          >
            View all posts →
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-biomed-teal animate-spin mb-4" />
            <p className="text-gray-500 text-lg">Loading blogs…</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              onMouseEnter={() => setIsAutoScrolling(false)}
              onMouseLeave={() => setIsAutoScrolling(true)}
            >
              {duplicatedBlogs.map((blog, idx) => (
                <Link
                  key={`blog-${blog.id}-${idx}`}
                  to={`/blogs/${blog.id}`}
                  className="group w-[320px] min-w-[320px] max-w-[320px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-biomed-teal/30 transition-all flex-shrink-0 block cursor-pointer"
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
                    <h3 className="font-semibold text-gray-900 line-clamp-2 h-12 group-hover:text-biomed-teal transition-colors">
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
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
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10 transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10 transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogCarousel;
