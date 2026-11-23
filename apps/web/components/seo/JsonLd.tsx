import React from 'react';

export function GymJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: 'IronWorks Gym Manchester',
    image: 'https://ironworksgym.co.uk/screenshots/preview-homepage.png',
    '@id': 'https://ironworksgym.co.uk',
    url: 'https://ironworksgym.co.uk',
    telephone: '+44 161 800 2026',
    priceRange: '£29 - £75',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '14 Blossom Street, Ancoats',
      addressLocality: 'Manchester',
      postalCode: 'M4 5AF',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.4839,
      longitude: -2.2275,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '21:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    creator: {
      '@type': 'Organization',
      name: 'SPManchester Private Limited',
      url: 'https://www.spmanchester.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
