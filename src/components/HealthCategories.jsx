import React from 'react';
import { User, Heart, Baby, Leaf, Candy, Scale, Moon, Bone, Shield, Droplet, Activity } from 'lucide-react';

const HealthCategories = () => {
  const categories = [
    { icon: User, name: "Men's Health", color: "bg-blue-100 text-blue-600" },
    { icon: Heart, name: "Women's Health", color: "bg-pink-100 text-pink-600" },
    { icon: Baby, name: "Kids Health", color: "bg-yellow-100 text-yellow-600" },
    { icon: Leaf, name: "Herbal Health", color: "bg-green-100 text-green-600" },
    { icon: Candy, name: "Gummies", color: "bg-red-100 text-red-600" },
    { icon: Scale, name: "Weight Management", color: "bg-purple-100 text-purple-600" },
    { icon: Moon, name: "Stress & Sleep", color: "bg-indigo-100 text-indigo-600" },
    { icon: Bone, name: "Bones & Joints", color: "bg-orange-100 text-orange-600" },
    { icon: Shield, name: "Immune Support", color: "bg-teal-100 text-teal-600" },
    { icon: Droplet, name: "Collagen", color: "bg-pink-100 text-pink-600" },
    { icon: Activity, name: "Blood Sugar Support", color: "bg-red-100 text-red-600" },
    { icon: Heart, name: "Heart Health", color: "bg-rose-100 text-rose-600" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          NATURAL CHOICE FOR YOUR HEALTH
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div key={idx} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-24 h-24 ${category.color} rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                  <Icon size={40} />
                </div>
                <span className="text-sm text-center text-gray-700 font-medium">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            VIEW MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthCategories;

