import React from 'react';

const Mission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              OUR MISSION - WELLNESS FOR LIFE!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">

            At Biomedinnovation, we're driven to push boundaries in healthcare innovation, crafting cutting-edge solutions that empower healthier lives. As your trusted partner in wellness, we blend science and compassion to improve lives, today and tomorrow .
            <br/>
            Your Healthcare Partner.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              LEARN MORE
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="rounded-2xl overflow-hidden h-96 shadow-xl">
            {/* <img 
              src="/assets/products/product-video.mp4" 
              alt="Healthcare Mission" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            /> */}
            <video src="/assets/products/product-video.mp4" autoPlay muted loop className="w-full h-full hover:scale-105 transition-transform duration-500"></video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

