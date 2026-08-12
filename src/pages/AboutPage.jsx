import React, { useState, useEffect } from 'react';
import { Award, Shield, Star, Globe, CheckCircle, Factory, Microscope, FileCheck, PackageCheck, Warehouse, TrendingUp, Users, Building2, Leaf } from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certifications = [
    { name: 'GMP', color: 'bg-blue-100 text-blue-600', icon: Shield },
    { name: 'HACCP', color: 'bg-green-100 text-green-600', icon: CheckCircle },
    { name: 'ISO', color: 'bg-purple-100 text-purple-600', icon: Award },
    { name: 'FDA', color: 'bg-red-100 text-red-600', icon: Shield },
    { name: 'USA', color: 'bg-blue-100 text-blue-600', icon: Star },
    { name: 'DRAP', color: 'bg-teal-100 text-teal-600', icon: CheckCircle },
    { name: 'HALAL', color: 'bg-green-100 text-green-600', icon: Leaf }
  ];

  const stats = [
    { number: '30+', label: 'Years Experience', icon: TrendingUp },
    { number: '60+', label: 'Countries', icon: Globe },
    { number: '500+', label: 'Team Members', icon: Users },
    { number: '100+', label: 'Products', icon: Factory }
  ];

  const processSteps = [
    {
      icon: Microscope,
      title: 'Research & Development',
      description: 'Our team of experts research & verify natural ingredients to find innovative formulation.'
    },
    {
      icon: Globe,
      title: 'Global Sourcing',
      description: 'We source premium quality ingredients from the certified suppliers around the globe.'
    },
    {
      icon: FileCheck,
      title: 'Quality Control',
      description: 'Raw materials are accepted only if they meet qualification conditions for quality & safety.'
    },

    {
      icon: PackageCheck,
      title: 'Final Testing',
      description: 'Finished product undergoes final testing to ensure safety, efficacy, and quality standards.'
    },
    {
      icon: Warehouse,
      title: 'Storage',
      description: 'Finished products are kept at controlled climate conditions in our warehouse.'
    }
  ];

  const priorities = [
    {
      title: 'SUPERIOR MANUFACTURING',
      description: 'BIOMED maintains high-quality manufacturing standards and has complete control over the production process. We ensure that each product is manufactured under strict supervision adhering to cGMP standards.'
    },
    {
      title: 'RESEARCH & DEVELOPMENT',
      description: 'Our team of experts focuses on the latest findings and natural ingredients. We conduct extensive scientific research to support our health claims and product formulations.'
    },
    {
      title: 'CURRENT HEALTH CONCERNS',
      description: 'We address consumer health issues by developing high-quality products. Our formulations target modern health challenges with evidence-based solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[110vh] overflow-hidden">
        <img 
          src="/assets/hero-section-banner/banner-image-1.jpg" 
          alt="Manufacturing Facility"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Stats Section */}
      {/* <section className="relative md:-mt-20 z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center group cursor-pointer">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-biomed-teal/10 rounded-full mb-4 group-hover:bg-biomed-teal group-hover:scale-110 transition-all">
                      <Icon className="text-biomed-teal group-hover:text-white" size={28} />
                    </div>
                    <p className="text-4xl font-bold text-biomed-navy mb-2">{stat.number}</p>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* Manufacturing Facility */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-14">
          <div className="text-center mb-12">
           
            <h2 className="text-4xl md:text-5xl font-bold text-biomed-navy mb-4">
            Providing you the best Innovative Pharmaceutical 
              <br />
              <span className="text-biomed-teal">& Nutraceuticals Products in Pakistan</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: 1, image: '/assets/new-products/product-1.jpeg' },
                { num: 2, image: '/assets/products/product-1.jpeg' },
                { num: 3, image: '/assets/products/product-2.jpeg' },
                { num: 3, image: '/assets/new-products/product-6.jpeg' }
              ].map((item) => (
                <div 
                  key={item.num} 
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer group"
                >
                  <img 
                    src={item.image} 
                    alt={`Manufacturing ${item.num}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
              Delivering Innovative Pharmaceutical & Nutraceutical Solutions for a Healthier Pakistan.   </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-biomed-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-biomed-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-biomed-navy mb-1">Highest Standards</h3>
                    <p className="text-gray-600 text-sm">Quality, safety, and efficiency in pharmaceutical production</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-biomed-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-biomed-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-biomed-navy mb-1">International Protocols</h3>
                    <p className="text-gray-600 text-sm">Strict adherence to global manufacturing standards</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-biomed-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-biomed-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-biomed-navy mb-1">Advanced Technology</h3>
                    <p className="text-gray-600 text-sm">Continuously upgraded to meet evolving industry standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backed By Science */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-14">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-2 rounded-full mb-6">
                <Microscope className="text-blue-600" size={20} />
                <span className="text-blue-600 font-semibold">Scientific Excellence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-biomed-navy mb-6">
                We Are Backed By <span className="text-biomed-teal">Science</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our carefully crafted formulations are prepared in a controlled environment under strict supervision of our healthcare experts. We adhere to international standards ensuring every product meets the highest quality benchmarks.
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
                {certifications.map((cert, idx) => {
                  const CertIcon = cert.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`${cert.color} aspect-square rounded-2xl flex flex-col items-center justify-center font-bold text-xs hover:scale-110 transition-all cursor-pointer shadow-md hover:shadow-lg`}
                    >
                      <CertIcon size={20} className="mb-1" />
                      <span>{cert.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-biomed-teal/20 to-biomed-navy/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-9xl mb-4">🔬</div>
                  <h3 className="text-2xl font-bold text-biomed-navy mb-2">Lab-Tested Quality</h3>
                  <p className="text-gray-600">Every product undergoes rigorous scientific testing</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-biomed-teal/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BIOMED */}
      <section className="py-20 bg-gradient-to-br from-biomed-teal/5 via-blue-50/50 to-purple-50/30">
        <div className="container px-14">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-biomed-navy mb-6">
              Why Choose <span className="text-biomed-teal">BIOMED</span>?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              At BIOMED, we believe in transparency and traceability from sustainable sourcing to final delivery. Our commitment to integrity and innovation helps bridge the gap between consumers and pharmaceutical science.
            </p>
          </div>
          
          {/* Product Showcase Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide hover:scrollbar-default">
              {[
                { num: 1, image: '/assets/new-products/product-1.jpeg', name: 'Magnesium Glycinate | Magnizen' },
                { num: 2, image: '/assets/products/product-1.jpeg', name: 'Vanur Men' },
                { num: 3, image: '/assets/products/product-2.jpeg', name: 'Vanur Women' },
                { num: 4, image: '/assets/products/product-7-A1.jpeg', name: 'DeAll Vitamin D3 200,000 IU & Vitamin K2 Softgel' },
                { num: 5, image: '/assets/products/product-8.jpeg', name: 'MRP2690' },
                { num: 1, image: '/assets/products/main-product.jpeg', name: 'Magnesium Glycinate | Magnizen' },
                { num: 2, image: '/assets/products/product-1.jpeg', name: 'Vanur Men' },
                { num: 3, image: '/assets/products/product-2.jpeg', name: 'Vanur Women' },
                { num: 4, image: '/assets/products/product-7-A1.jpeg', name: 'DeAll Vitamin D3 200,000 IU & Vitamin K2 Softgel' },
                { num: 5, image: '/assets/products/product-8.jpeg', name: 'MRP2690' },
                { num: 1, image: '/assets/products/main-product.jpeg', name: 'Magnesium Glycinate | Magnizen' },
                { num: 2, image: '/assets/products/product-1.jpeg', name: 'Vanur Men' },
                { num: 3, image: '/assets/products/product-2.jpeg', name: 'Vanur Women' },
                { num: 4, image: '/assets/products/product-7-A1.jpeg', name: 'DeAll Vitamin D3 200,000 IU & Vitamin K2 Softgel' },
                { num: 5, image: '/assets/products/product-8.jpeg', name: 'MRP2690' }
            
              ].map((item) => (
                <div 
                  key={item.num} 
                  className="min-w-[200px] flex-shrink-0 group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-56 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-biomed-navy mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">100% tested & certified products</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-biomed-navy mb-2">Safe & Effective</h3>
              <p className="text-sm text-gray-600">Clinically proven formulations</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-biomed-navy mb-2">Global Standards</h3>
              <p className="text-sm text-gray-600">International certifications</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-teal-600" size={32} />
              </div>
              <h3 className="font-bold text-biomed-navy mb-2">Natural Ingredients</h3>
              <p className="text-sm text-gray-600">Sustainably sourced materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* From Nature To You */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-biomed-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 px-6 py-2 rounded-full mb-6">
              <Leaf className="text-green-600" size={20} />
              <span className="text-green-600 font-semibold">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-biomed-navy mb-4">
              From Nature <span className="text-biomed-teal">To You</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A meticulous journey of quality, care, and precision at every step
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={idx} 
                    className="relative group"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
                      {/* Step Number */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-biomed-teal to-biomed-navy rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">{idx + 1}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-biomed-teal/20 to-biomed-navy/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="text-biomed-navy" size={36} />
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-bold text-xl text-biomed-navy mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* Worldwide Footprints */}
      {/* <section className="py-20 bg-gradient-to-br from-biomed-navy via-biomed-navy to-biomed-blue text-white relative overflow-hidden">
      
        <div className="absolute top-0 right-0 w-96 h-96 bg-biomed-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Globe className="text-biomed-teal" size={22} />
              <span className="text-white font-semibold text-lg">Global Presence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Worldwide <span className="text-biomed-teal">Footprints</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Delivering quality healthcare solutions across continents
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-biomed-teal to-biomed-teal/80 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all">
                <Globe className="mb-4" size={40} />
                <p className="text-6xl font-bold mb-2">60+</p>
                <p className="text-xl font-semibold">Countries</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all">
                <Building2 className="mb-4" size={40} />
                <p className="text-5xl font-bold mb-2">100+</p>
                <p className="text-lg font-semibold">Distribution Centers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all">
                <Users className="mb-4" size={40} />
                <p className="text-5xl font-bold mb-2">500+</p>
                <p className="text-lg font-semibold">Team Members</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all">
                <Award className="mb-4" size={40} />
                <p className="text-5xl font-bold mb-2">30+</p>
                <p className="text-lg font-semibold">Years Experience</p>
              </div>
            </div>

      
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="text-9xl mb-6">🗺️</div>
                <h3 className="text-2xl font-bold mb-3">Global Distribution Network</h3>
                <p className="text-gray-300 mb-6">
                  Trusted by healthcare professionals worldwide
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['🇺🇸', '🇬🇧', '🇦🇪', '🇸🇦', '🇵🇰', '🇮🇳', '🇨🇦', '🇦🇺'].map((flag, i) => (
                    <div key={i} className="text-4xl hover:scale-125 transition-transform cursor-pointer">
                      {flag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-biomed-teal hover:bg-biomed-teal/90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Explore Our Global Presence
            </button>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-biomed-teal/10 via-blue-50/50 to-purple-50/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-biomed-teal/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full mb-6 shadow-md">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
              <span className="text-biomed-navy font-semibold">Your Most Trusted Brand</span>
            </div>
            
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-biomed-navy mb-6 leading-tight">
              Add The Factor of <span className="text-biomed-teal">Nutrition</span> To Your Life
            </h2>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
              Where Quality, Safety, and Efficacy meet excellence
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={28} />
                </div>
                <h3 className="font-bold text-biomed-navy mb-2">Quality Assured</h3>
                <p className="text-sm text-gray-600">Lab-tested & certified</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-blue-600" size={28} />
                </div>
                <h3 className="font-bold text-biomed-navy mb-2">Safe & Effective</h3>
                <p className="text-sm text-gray-600">Clinically proven</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-purple-600" size={28} />
                </div>
                <h3 className="font-bold text-biomed-navy mb-2">Certified Excellence</h3>
                <p className="text-sm text-gray-600">Global standards</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-biomed-navy hover:bg-biomed-navy/90 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                See Our Product Range
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="group bg-white border-2 border-biomed-navy hover:bg-biomed-navy text-biomed-navy hover:text-white px-10 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                Help Me Choose
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

