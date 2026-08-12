import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-4 bg-white/10 backdrop-blur-sm p-3 rounded-lg inline-block">
              <img
                src="/assets/Biomed.png"
                alt="BIOMED Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your Health Care Partner - Innovation in Pharmaceuticals for Better Health!
            </p>
            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+923180079172" className="hover:text-white">+92318 0079172</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>biomedinnovationpharmaceutical@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://web.facebook.com/people/BioMed-Innovation-Pharmaceuticals-Pvt-Ltd/61582286841179/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BioMed on Facebook"
                className="hover:text-biomed-teal"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/biomedinnovation_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BioMed on Instagram"
                className="hover:text-biomed-teal"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/biomed-innovation-pharmaceuticals-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BioMed on LinkedIn"
                className="hover:text-biomed-teal"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* BIOMED Links */}
          <div>
            <h4 className="font-bold mb-4">BIOMED</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/blogs" className="hover:text-white">Health Blog</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/notifications" className="hover:text-white">Notifications</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white">All Products</Link></li>
              <li><Link to="/products/best-selling" className="hover:text-white">Best Selling</Link></li>
              <li><Link to="/offers" className="hover:text-white">Offers</Link></li>
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-bold mb-4">BUSINESS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/international" className="hover:text-white">International</Link></li>
              <li><Link to="/quality-safety" className="hover:text-white">Quality & Safety</Link></li>
              <li><Link to="/become-a-distributor" className="hover:text-white">Become A Distributor</Link></li>
              <li><Link to="/store-locator" className="hover:text-white">Store Locator</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">NEWSLETTER SIGN UP</h4>
            <p className="text-sm text-gray-400 mb-4">
              Receive the latest updates about our products and promotions.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-biomed-teal"
              />
              <button className="bg-biomed-navy hover:bg-biomed-navy/90 text-white px-6 py-2 rounded font-semibold transition-colors">
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        {/* Help & Terms */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-4">
            <Link to="/shipping-policy" className="hover:text-white">Shipping Policy</Link>
            <Link to="/disclaimers" className="hover:text-white">Disclaimers</Link>
            <Link to="/return-refund" className="hover:text-white">Return & Refund</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2026 All Rights Reserved BIOMED Innovation Pharmaceuticals (Pvt) Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
