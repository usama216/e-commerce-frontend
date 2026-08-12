import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeItem }) => {
  const total = cartItems.reduce((sum, item) => sum + ((item.discountedPrice ?? item.originalPrice ?? 0) * (item.quantity || 1)), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-biomed-navy text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} />
              <h2 className="text-xl font-bold">Shopping Cart</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingBag size={64} className="mb-4 opacity-30" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                    <img 
                      src={item.image || (item.images && item.images[0]) || '/assets/products/main-product.jpeg'} 
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-biomed-teal font-bold">Rs. {item.discountedPrice ?? item.originalPrice ?? 0}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-biomed-teal">Rs. {total}</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full bg-biomed-navy hover:bg-biomed-navy/90 text-white py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

