import React from 'react';

const HealthConcerns = () => {
  const concerns = [
    'Acidity', 'Acne Breakouts', 'Anti Aging', 'Anxiety', 'Blood Pressure',
    'Cholesterol', 'Diabetes', 'Hair Growth', 'Weight Loss', 'Heart Health',
    'Immunity Booster', 'Joint Pain', 'Memory & Focus', 'Muscle Growth',
    'Skin Brightening', 'Sleep Issues', 'Stress Relief', 'Thyroid',
    'Vitamin Deficiency', 'Bone Health', 'Digestive Health', 'Energy Boost',
    'Eye Health', 'Liver Health', 'Men\'s Vitality', 'Women\'s Health',
    'Prenatal Care', 'Post Workout Recovery'
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          WE'RE HERE TO HELP YOU WITH
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {concerns.map((concern, idx) => (
            <button
              key={idx}
              className="bg-biomed-navy hover:bg-biomed-navy/90 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              {concern}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthConcerns;

