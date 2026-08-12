import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Package, Mail, MapPin, ChevronRight } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const [expandedFaq, setExpandedFaq] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', phone: '', email: '', comment: '' });
  };

  const faqs = [
    {
      question: "What are the shipping charges & how long does it take to get delivered?",
      answer: "We offer free shipping on orders above Rs. 2000. Standard delivery takes 3-5 business days within major cities and 5-7 days for remote areas."
    },
    {
      question: "How does our order verification process work?",
      answer: "After placing an order, our team verifies your details via phone call or SMS. Once confirmed, your order is processed and shipped within 24 hours."
    },
    {
      question: "What are the exchange, return, and refund policies for BIOMED?",
      answer: "We accept returns within 14 days of delivery for unopened products. Refunds are processed within 7-10 business days. Exchange is available for damaged or incorrect items."
    },
    {
      question: "How do I return BIOMED's products if purchased from a different store?",
      answer: "For products purchased from retail stores, please contact the store directly. For online purchases, contact our customer care team for return authorization."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Contact Section */}
      <section className="py-16 bg-gradient-to-br from-biomed-teal/5 to-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Info */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">DO YOU HAVE QUESTIONS?</h1>
              <h2 className="text-5xl font-bold text-biomed-navy mb-6">CONTACT US</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Get in touch with BIOMED Innovation Pharmaceuticals (Pvt.) Ltd. We are committed to responding to customer inquiries and providing quality healthcare support.
              </p>

              {/* Quick Response Options */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">FOR QUICK RESPONSE</h3>
              <div className="space-y-3">
                <button className="w-full bg-white border-2 border-biomed-navy hover:bg-biomed-navy hover:text-white text-biomed-navy p-4 rounded-lg flex items-center gap-3 font-semibold transition-colors">
                  <Phone size={24} />
                  Request a Call
                </button>
                <button className="w-full bg-white border-2 border-biomed-navy hover:bg-biomed-navy hover:text-white text-biomed-navy p-4 rounded-lg flex items-center gap-3 font-semibold transition-colors">
                  <MessageCircle size={24} />
                  Chat Support
                </button>
                <button className="w-full bg-white border-2 border-biomed-navy hover:bg-biomed-navy hover:text-white text-biomed-navy p-4 rounded-lg flex items-center gap-3 font-semibold transition-colors">
                  <Package size={24} />
                  Track Your Order
                </button>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biomed-teal"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biomed-teal"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biomed-teal"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Comment *"
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biomed-teal resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Business Inquiries */}
      <section className="py-8 bg-white border-y">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-xl font-bold text-biomed-navy">BUSINESS INQUIRIES</span>
            <a 
              href="mailto:biomedinnovationpharmaceutical@gmail.com" 
              className="text-xl font-semibold text-biomed-teal hover:underline"
            >
              BIOMEDINNOVATIONPHARMACEUTICAL@GMAIL.COM
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Office */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <h2 className="text-4xl font-bold text-center text-biomed-navy mb-12">CORPORATE OFFICE</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Corporate Office */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-biomed-navy mb-4">Corporate Office</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-biomed-teal flex-shrink-0 mt-0.5" />
                  <p>13 A/C Muhafiz town Phase 1 Multan Road Lahore</p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone size={18} className="text-biomed-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Call us</p>
                    <a href="tel:+923180079172" className="hover:text-biomed-teal block">+92 318 0079172</a>
                    <a href="tel:+923354130451" className="hover:text-biomed-teal block mt-1">+92 335 4130451 (Alt.)</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={18} className="text-biomed-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>biomedinnovationpharmaceutical@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Care */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-biomed-navy mb-4">Customer Care</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-biomed-teal flex-shrink-0 mt-0.5" />
                  <p>13 A/C Muhafiz town Phase 1 Multan Road Lahore</p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone size={18} className="text-biomed-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Call us</p>
                    <a href="tel:+923180079172" className="hover:text-biomed-teal block">+92 318 0079172</a>
                    <a href="tel:+923354130451" className="hover:text-biomed-teal block mt-1">+92 335 4130451 (Alt.)</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={18} className="text-biomed-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>biomedinnovationpharmaceutical@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Regional Offices */}
              {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <h2 className="text-4xl font-bold text-center text-biomed-navy mb-12">INTERNATIONAL REGIONAL OFFICES</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-biomed-navy mb-4">Regional Office USA</h3>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin size={20} className="text-biomed-teal flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">BIOMED Inc.</p>
                  <p>Colonia, New Jersey, 07067</p>
                  <p>United States</p>
                </div>
              </div>
            </div>

        
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-biomed-navy mb-4">Factory Address</h3>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin size={20} className="text-biomed-teal flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">BIOMED Innovation Pharmaceuticals (Pvt.) Ltd</p>
                  <p>13 A/C Muhafiz town Phase 1 Multan Road Lahore</p>
                  <p>Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-4xl mx-auto">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-biomed-navy">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <div className="w-24 h-1 bg-biomed-teal mx-auto mt-6"></div>
            </div>
            
            {/* Centered Questions */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-biomed-teal/5 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronRight 
                      size={20} 
                      className={`text-biomed-navy flex-shrink-0 transform transition-transform duration-300 ${
                        expandedFaq === idx ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-5 pb-5 bg-biomed-teal/5">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

