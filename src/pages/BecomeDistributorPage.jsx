import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const BecomeDistributorPage = () => (
  <PolicyPageLayout
    title="Become A Distributor"
    intro="Partner With BIOMED — Become part of our growing distribution network and expand healthcare access across Pakistan."
    sections={[
      {
        heading: 'Distributor Benefits',
        bullets: [
          'Competitive business opportunities',
          'Quality healthcare products',
          'Marketing support',
          'Reliable supply chain',
          'Business growth partnership',
        ],
      },
      {
        heading: 'Distributor Inquiries',
        paragraphs: [
          'For distributor inquiries:',
          'Phone: +92 334-4130451',
          'Email: biomedinnovationpharmaceutical@gmail.com',
        ],
      },
    ]}
  />
);

export default BecomeDistributorPage;
