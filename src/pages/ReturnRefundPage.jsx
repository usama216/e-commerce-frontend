import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const ReturnRefundPage = () => (
  <PolicyPageLayout
    title="Return & Refund Policy"
    intro="Customer satisfaction and product quality remain our priority."
    sections={[
      {
        heading: 'Eligible Return Conditions',
        paragraphs: ['Customers may request returns or replacements if:'],
        bullets: [
          'Wrong product has been delivered',
          'Product received is damaged',
          'Product delivered is expired',
          'Product quantity is missing from shipment',
        ],
      },
      {
        heading: 'Return Request Period',
        paragraphs: [
          'Customers must report any issue within 72 hours of receiving their order.',
        ],
      },
      {
        heading: 'Non-Returnable Products',
        paragraphs: [
          'For hygiene and safety reasons, the following products are not eligible for return:',
        ],
        bullets: [
          'Opened products',
          'Used products',
          'Products with broken seals',
          'Medicines damaged after delivery',
          'Personal care products',
        ],
      },
      {
        heading: 'Refund Process',
        paragraphs: [
          'Approved refunds will be processed within 7–10 business days through the original payment method or an agreed alternative.',
        ],
      },
      {
        heading: 'Return Approval',
        paragraphs: [
          'BIOMED Innovation Pharmaceuticals (Pvt.) Ltd reserves the right to inspect products before approving replacement or refund requests.',
        ],
      },
    ]}
  />
);

export default ReturnRefundPage;
