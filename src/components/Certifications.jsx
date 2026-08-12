import React from 'react';

const Certifications = () => {
  const baseCertificates = [
    '/assets/certificates/certificate-1.png',
    '/assets/certificates/certificate-2.png',
    '/assets/certificates/certificate-3.png',
    '/assets/certificates/certificate-4.png',
    '/assets/certificates/certificate-5.jpeg',
    '/assets/certificates/certificate-6.jpeg',
    '/assets/certificates/certificate-7.jpeg',
    '/assets/certificates/certificate-8.jpeg',
    '/assets/certificates/certificate-9.jpeg',
    '/assets/certificates/certificate-10.jpeg',
    '/assets/certificates/certificate-11.jpeg',
    '/assets/certificates/certificate-12.jpeg',
  ];

  const renderSet = (keyPrefix) =>
    baseCertificates.map((cert, idx) => (
      <div key={`${keyPrefix}-${idx}`} className="flex-shrink-0 mx-3 md:mx-4">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-lg flex items-center justify-center shadow-lg p-2 transition-transform hover:scale-110">
          <img
            src={cert}
            alt={`Certificate ${idx + 1}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    ));

  return (
    <section className="bg-biomed-navy py-6 md:py-12 overflow-hidden">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-white text-center text-xl md:text-2xl font-semibold mb-8">
          Certificates From Global Regulatory Authorities
        </h2>

        <div className="relative overflow-hidden">
          {/* w-max keeps full content width on mobile so -50% marquee covers all logos */}
          <div className="flex w-max animate-marquee-slow hover:pause-marquee">
            <div className="flex shrink-0 items-center">{renderSet('a')}</div>
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {renderSet('b')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
