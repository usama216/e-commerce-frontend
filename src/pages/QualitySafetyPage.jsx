import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const QualitySafetyPage = () => (
  <PolicyPageLayout
    title="Quality & Safety"
    intro="At BIOMED Innovation Pharmaceuticals, quality and patient safety remain our highest priorities."
    sections={[
      {
        heading: 'Our Quality Commitments',
        paragraphs: ['Our quality commitments include:'],
        bullets: [
          'GMP compliance',
          'Strict quality control procedures',
          'Raw material verification',
          'Product testing',
          'International manufacturing protocols',
          'Safety monitoring',
        ],
      },
      {
        paragraphs: [
          'Each product undergoes rigorous testing before reaching customers.',
        ],
      },
    ]}
  />
);

export default QualitySafetyPage;
