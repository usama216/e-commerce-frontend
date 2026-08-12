import React from 'react';

const Science = () => {
  const certifications = ['GMP', 'HACCP', 'ISO', 'FDA', 'USA', 'DRAP', 'Halal'];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="rounded-2xl overflow-hidden h-96 shadow-xl">
            <img 
              src="/assets/hero-section-banner/banner-image--3.webp" 
              alt="Scientific Research" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Side - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              WE ARE BACKED BY SCIENCE
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our carefully crafted formulations are prepared in a controlled environment 
              under strict supervision of our healthcare experts.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              {certifications.map((cert, idx) => (
                <div key={idx} className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-purple-600">{cert}</span>
                </div>
              ))}
            </div>
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              KNOW MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;

