import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const PrivacyPolicyPage = () => (
  <PolicyPageLayout
    title="Privacy Policy"
    intro="BIOMED Innovation Pharmaceuticals (Pvt.) Ltd values customer privacy and is committed to protecting personal information."
    sections={[
      {
        heading: 'Information We Collect',
        paragraphs: ['We may collect:'],
        bullets: [
          'Full name',
          'Email address',
          'Phone number',
          'Shipping and billing address',
          'Payment details',
          'Order history',
          'Website usage information',
        ],
      },
      {
        heading: 'Use of Information',
        paragraphs: ['Customer information may be used to:'],
        bullets: [
          'Process and deliver orders',
          'Provide customer support',
          'Improve website performance',
          'Send order updates',
          'Provide promotional offers and healthcare updates',
        ],
      },
      {
        heading: 'Data Security',
        paragraphs: [
          'We apply reasonable administrative and technical safeguards to protect customer information from unauthorized access, disclosure, or misuse.',
        ],
      },
      {
        heading: 'Third-Party Sharing',
        paragraphs: [
          'Customer information may be shared only with:',
        ],
        bullets: [
          'Delivery partners',
          'Payment processing services',
          'Technology service providers',
        ],
      },
      {
        paragraphs: [
          'BIOMED Innovation Pharmaceuticals (Pvt.) Ltd does not sell customer information to third parties.',
        ],
      },
      {
        heading: 'Cookies Policy',
        paragraphs: [
          'Our website may use cookies and analytics technologies to improve user experience and website performance.',
        ],
      },
      {
        heading: 'Contact Information',
        paragraphs: [
          'For privacy-related questions, you may contact BIOMED Innovation Pharmaceuticals (Pvt.) Ltd using the details below.',
        ],
      },
    ]}
  />
);

export default PrivacyPolicyPage;
