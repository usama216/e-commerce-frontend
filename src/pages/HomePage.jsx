import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Certifications from '../components/Certifications';
import HealthCategories from '../components/HealthCategories';
import TrendingProducts from '../components/TrendingProducts';
import HealthConcerns from '../components/HealthConcerns';
import Mission from '../components/Mission';
import Science from '../components/Science';
import LatestOffers from '../components/LatestOffers';
import WorldwideFootprint from '../components/WorldwideFootprint';
import BlogCarousel from '../components/BlogCarousel';
import ProductGridSection from '../components/ProductGridSection';
import { OFFER_CATEGORY_OPTIONS } from '../constants/productCategories';

const HomePage = ({ addToCart }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Certifications />
      {/* <HealthCategories /> */}
      <TrendingProducts addToCart={addToCart} />
      <ProductGridSection
        addToCart={addToCart}
        title="BEST SELLING"
        categories={['Best Selling']}
        viewMoreLink="/products"
      />
      <ProductGridSection
        addToCart={addToCart}
        title="OFFERS & BUNDLES"
        categories={OFFER_CATEGORY_OPTIONS}
        viewMoreLink="/offers"
      />
      
      {/* Video Section */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
            <video 
              src="/assets/products/section-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              style={{ pointerEvents: 'none' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
      
      {/* <HealthConcerns /> */}
      <Mission />
      <BlogCarousel />
      {/* <Science /> */}
      {/* <LatestOffers addToCart={addToCart} /> */}
      {/* <WorldwideFootprint /> */}
    </>
  );
};

export default HomePage;

