import React from 'react';
import { Globe, MapPin } from 'lucide-react';

const WorldwideFootprint = () => {
  return (
    <section className="py-16 bg-biomed-teal/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div className="bg-biomed-navy text-white p-8 rounded-2xl">
              <p className="text-6xl font-bold mb-2">60+</p>
              <p className="text-2xl">COUNTRIES</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              OUR WORLDWIDE FOOTPRINT!
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md">
                <div className="bg-biomed-teal/20 p-4 rounded-full">
                  <Globe className="text-biomed-navy" size={32} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-biomed-teal">6</p>
                  <p className="text-gray-700">Countries</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md">
                <div className="bg-biomed-teal/20 p-4 rounded-full">
                  <MapPin className="text-biomed-navy" size={32} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-biomed-teal">100+</p>
                  <p className="text-gray-700">Distribution Centers</p>
                </div>
              </div>
            </div>
            <button className="bg-biomed-navy hover:bg-biomed-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              SHOW MORE
            </button>
          </div>

          {/* Right Side - Map Illustration */}
          <div className="bg-white rounded-2xl p-8 shadow-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🗺️</div>
              <p className="text-gray-700 font-medium">
                Global Distribution Network
              </p>
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-biomed-teal rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldwideFootprint;

