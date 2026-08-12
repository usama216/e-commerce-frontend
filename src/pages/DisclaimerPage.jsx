import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const DisclaimerPage = () => (
  <PolicyPageLayout
    title="Disclaimer"
    intro="The information available on BIOMED Innovation Pharmaceuticals (Pvt.) Ltd is intended for healthcare awareness and educational purposes only."
    sections={[
      {
        heading: 'Medical Disclaimer',
        bullets: [
          'Information on this website does not constitute medical advice, diagnosis, or treatment.',
          'Customers should consult a qualified physician, pharmacist, or healthcare professional before using medicines, supplements, or healthcare products.',
          'Self-medication may result in health risks.',
        ],
      },
      {
        heading: 'Product Disclaimer',
        bullets: [
          'Product images are for illustrative purposes only.',
          'Actual product packaging, ingredients, and appearance may vary due to manufacturer updates.',
          'Individual results from pharmaceutical or nutraceutical products may differ.',
        ],
      },
      {
        heading: 'Liability Disclaimer',
        paragraphs: [
          'BIOMED Innovation Pharmaceuticals (Pvt.) Ltd shall not be held liable for any direct or indirect damages resulting from misuse of products, incorrect usage, or reliance on information available on the website.',
        ],
      },
    ]}
  />
);

export default DisclaimerPage;
