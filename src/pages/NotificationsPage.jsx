import React from 'react';
import PolicyPageLayout from '../components/PolicyPageLayout';

const NotificationsPage = () => (
  <PolicyPageLayout
    title="Notifications"
    intro="Stay connected with BIOMED for the latest updates from our team."
    sections={[
      {
        heading: 'What You’ll Receive',
        paragraphs: ['Stay connected with BIOMED for:'],
        bullets: [
          'Product launches',
          'Promotional offers',
          'Healthcare updates',
          'Company announcements',
          'Industry news',
          'New arrivals',
        ],
      },
      {
        heading: 'Subscribe',
        paragraphs: [
          'Subscribe to receive the latest updates directly. You can also use the newsletter signup in the website footer to stay informed.',
        ],
      },
    ]}
  />
);

export default NotificationsPage;
