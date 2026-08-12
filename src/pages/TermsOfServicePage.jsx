import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const TermsOfServicePage = () => (
  <PolicyPageLayout
    title="Terms of Service"
    intro="By using this website, you agree to comply with these terms and conditions."
    sections={[
      {
        heading: 'Website Usage',
        paragraphs: ['Users agree to:'],
        bullets: [
          'Provide accurate personal information',
          'Use the website for lawful purposes only',
          'Avoid fraudulent activities and misuse',
        ],
      },
      {
        heading: 'Product Availability',
        paragraphs: [
          'All products are subject to stock availability. BIOMED Innovation Pharmaceuticals (Pvt.) Ltd reserves the right to discontinue products without prior notice.',
        ],
      },
      {
        heading: 'Pricing Policy',
        paragraphs: [
          'Prices displayed on the website are listed in Pakistani Rupees (PKR) and may change without notice.',
        ],
      },
      {
        heading: 'Order Acceptance',
        paragraphs: ['We reserve the right to:'],
        bullets: [
          'Cancel suspicious orders',
          'Verify customer information',
          'Limit quantities purchased',
        ],
      },
      {
        heading: 'Intellectual Property Rights',
        paragraphs: [
          'All content on this website including text, graphics, logos, images, product descriptions, and digital materials is the intellectual property of BIOMED Innovation Pharmaceuticals (Pvt.) Ltd and may not be copied or reproduced without written permission.',
        ],
      },
      {
        heading: 'Governing Law',
        paragraphs: [
          'These terms and conditions shall be governed according to the laws and regulations of the Islamic Republic of Pakistan.',
        ],
      },
    ]}
  />
);

export default TermsOfServicePage;
