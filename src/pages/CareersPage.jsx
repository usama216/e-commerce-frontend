import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const CareersPage = () => (
  <PolicyPageLayout
    title="Careers"
    intro="Join Our Team — BIOMED Innovation Pharmaceuticals (Pvt.) Ltd believes that people drive innovation and success. We welcome passionate professionals interested in contributing to healthcare excellence."
    sections={[
      {
        heading: 'Career Opportunities',
        paragraphs: ['Career opportunities may include:'],
        bullets: [
          'Medical Representatives',
          'Sales & Marketing',
          'Business Development',
          'Regulatory Affairs',
          'Quality Assurance',
          'Pharmacists',
          'Supply Chain & Operations',
          'Administration',
        ],
      },
      {
        heading: 'How to Apply',
        paragraphs: [
          'Send your CV to:',
          'Email: biomedinnovationpharmaceutical@gmail.com',
        ],
      },
    ]}
  />
);

export default CareersPage;
