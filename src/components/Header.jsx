import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartCount = 0, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Handle smooth mobile menu close
  const handleMobileMenuClose = () => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 300); // Match animation duration
  };

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      handleMobileMenuClose();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileMenuClosing(false);
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="bg-biomed-teal/10 py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xs text-biomed-navy mx-3">
            Your Health Care Partner - Free Home Delivery On Orders Above Rs. 2000
          </span>
          <span className="text-xs text-biomed-navy mx-3">
            Your Health Care Partner - Free Home Delivery On Orders Above Rs. 2000
          </span>
          <span className="text-xs text-biomed-navy mx-3">
            Your Health Care Partner - Free Home Delivery On Orders Above Rs. 2000
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/assets/Biomed.png" 
                alt="BIOMED Logo" 
                className="h-12 sm:h-14 md:h-14 lg:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search the store"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biomed-teal"
                />
                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              {/* Mobile Search Button */}
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                aria-label="Toggle search"
              >
                <Search size={20} />
              </button>

              {/* Cart */}
              <button 
                onClick={onCartClick}
                className="relative p-2 hover:text-biomed-teal transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <button className="hidden sm:flex items-center gap-1.5 hover:text-biomed-teal">
                <User size={20} />
                <span className="hidden md:inline text-sm">My Account</span>
              </button>
              <button className="sm:hidden p-2 hover:text-biomed-teal">
                <User size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="lg:hidden mt-2 animate-fadeIn">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search the store"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biomed-teal transition-all"
                  autoFocus
                />
                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:block bg-white border-t relative">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-6 py-2 text-sm">
              <li><Link to="/" className="hover:text-biomed-teal font-medium">Home</Link></li>
              <li><Link to="/products" className="hover:text-biomed-teal font-medium">Products</Link></li>
              <li><Link to="/offers" className="hover:text-biomed-teal">Offers</Link></li>
              <li><Link to="/blogs" className="hover:text-biomed-teal">Blog</Link></li>
              <li><Link to="/about" className="hover:text-biomed-teal">About Us</Link></li>
              {/* <li><a href="#" className="hover:text-biomed-teal">Careers</a></li> */}
              <li><Link to="/contact" className="hover:text-biomed-teal">Contact Us</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className={`lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
              isMobileMenuClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleMobileMenuClose}
          />
          
          {/* Mobile Menu */}
          <div className={`lg:hidden fixed inset-y-0 left-0 top-0 bg-white z-[60] w-[85%] max-w-sm overflow-y-auto shadow-2xl ${
            isMobileMenuClosing ? 'animate-slideOutLeft' : 'animate-slideInLeft'
          }`}>
            <nav className="px-4 py-6">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className="block py-2 text-base font-medium hover:text-biomed-teal transition-colors"
                    onClick={handleMobileMenuClose}
                  >
                    Home
                  </Link>
                </li>
              
              <li>
                <Link 
                  to="/products" 
                  className="block py-2 text-base font-medium hover:text-biomed-teal transition-colors"
                  onClick={handleMobileMenuClose}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/offers" 
                  className="block py-2 text-base font-medium hover:text-biomed-teal transition-colors"
                  onClick={handleMobileMenuClose}
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link 
                  to="/blogs" 
                  className="block py-2 text-base font-medium hover:text-biomed-teal transition-colors"
                  onClick={handleMobileMenuClose}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block py-2 text-base font-medium hover:text-biomed-teal transition-colors"
                  onClick={handleMobileMenuClose}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block py-2 text-base font-medium hover:text-biomed-teal transition-colors"
                  onClick={handleMobileMenuClose}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        </>
      )}
    </header>
  );
};

export default Header;

