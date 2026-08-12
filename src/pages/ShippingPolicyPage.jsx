import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const ShippingPolicyPage = () => (
  <PolicyPageLayout
    title="Shipping Policy"
    intro="Welcome to BIOMED Innovation Pharmaceuticals (Pvt.) Ltd. We are committed to delivering pharmaceutical products, nutraceutical supplements, and healthcare solutions safely and efficiently throughout Pakistan."
    sections={[
      {
        heading: 'Delivery Coverage',
        paragraphs: [
          'BIOMED Innovation Pharmaceuticals (Pvt.) Ltd provides nationwide delivery services across Pakistan, including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and surrounding regions.',
        ],
      },
      {
        heading: 'Delivery Timeframe',
        bullets: [
          'Lahore: 1–2 business days',
          'Major cities: 2–4 business days',
          'Remote areas: 3–7 business days',
        ],
      },
      {
        paragraphs: [
          'Delivery times are estimated and may vary due to courier operations, public holidays, weather conditions, or unforeseen circumstances.',
        ],
      },
      {
        heading: 'Shipping Charges',
        bullets: [
          'Free home delivery on orders above Rs. 2,000',
          'Standard delivery charges may apply to orders below the specified threshold',
        ],
      },
      {
        heading: 'Order Processing',
        paragraphs: [
          'Orders are generally processed within 24 hours after confirmation and payment verification (where applicable).',
        ],
      },
      {
        heading: 'Order Tracking',
        paragraphs: [
          'Customers can track their orders directly through the “Track Your Order” section on the website.',
        ],
      },
      {
        heading: 'Delivery Restrictions',
        paragraphs: [
          'Certain products may require special handling and delivery conditions according to applicable pharmaceutical regulations in Pakistan.',
        ],
      },
    ]}
  />
);

export default ShippingPolicyPage;
