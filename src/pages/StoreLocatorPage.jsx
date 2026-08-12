import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const StoreLocatorPage = () => (
  <PolicyPageLayout
    title="Store Locator"
    intro="Find BIOMED products through our authorized distributors, pharmacies, and healthcare partners throughout Pakistan."
    sections={[
      {
        heading: 'Need Help Finding Products?',
        paragraphs: [
          'For assistance locating products, contact our customer support team.',
          'Phone: +92 318 0079172',
        ],
      },
    ]}
  />
);

export default StoreLocatorPage;
