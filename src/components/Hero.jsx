import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchBanners } from '../api';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBanners();
        const list = (data.banners || [])
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map((b) => b.image_url || '')
          .filter(Boolean);
        if (!cancelled) {
          setSlides(list);
          setCurrentSlide(0);
        }
      } catch {
        if (!cancelled) setSlides([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const imageUrl = (src) => {
    if (!src) return '';
    if (src.startsWith('http')) return src;
    if (src.startsWith('/')) return src;
    return `/${src.replace(/^\//, '')}`;
  };

  if (loading) {
    return (
      <section className="relative h-[250px] md:h-[110vh] bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative h-[250px] md:h-[110vh] overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={imageUrl(image)}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? 'w-12 h-3 bg-biomed-teal'
                    : 'w-3 h-3 bg-white/60 hover:bg-white/90'
                } rounded-full shadow-lg`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
