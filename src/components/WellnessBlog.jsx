import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

const WellnessBlog = () => {
  const mainPost = {
    title: 'The Anaemia Around You',
    excerpt: 'Understanding the causes, symptoms, and treatments of anaemia, one of the most common nutritional deficiencies affecting millions worldwide...',
    date: 'NOV 10, 2024',
    category: 'Health',
    image: 'bg-gradient-to-br from-red-200 to-pink-200'
  };

  const sidePosts = [
    {
      title: 'What you need to know about Remi...',
      readTime: '5 min read',
      category: 'Health',
      date: 'NOV 05, 2024'
    },
    {
      title: 'Turn Your Health Around with the P...',
      readTime: '4 min read',
      category: 'Wellness',
      date: 'NOV 01, 2024'
    },
    {
      title: 'Berry Your Way Out of Urinary Tract...',
      readTime: '6 min read',
      category: 'Health',
      date: 'OCT 28, 2024'
    },
    {
      title: 'The \'M\' in Migraine Stands for Mag...',
      readTime: '5 min read',
      category: 'Health',
      date: 'OCT 25, 2024'
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            WELLNESS BLOG
          </h2>
          <Link to="/blogs" className="mt-4 text-biomed-teal font-semibold hover:text-biomed-navy hover:underline">
            View all posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Blog Post */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`${mainPost.image} h-64 flex items-center justify-center`}>
                <div className="text-6xl">📰</div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-biomed-teal/20 text-biomed-navy px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {mainPost.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {mainPost.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {mainPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={16} />
                    <span>{mainPost.date}</span>
                  </div>
                  <Link to="/blogs" className="text-biomed-teal font-semibold hover:text-biomed-navy">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Posts */}
          <div className="space-y-4">
            {sidePosts.map((post, idx) => (
              <div key={idx} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessBlog;

