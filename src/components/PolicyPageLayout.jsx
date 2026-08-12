import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared layout for legal / policy pages.
 * sections: [{ heading?, paragraphs?: string[], bullets?: string[] }]
 */
const PolicyPageLayout = ({ title, intro, sections = [] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-biomed-navy text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
          {intro && (
            <p className="text-gray-700 leading-relaxed mb-8">{intro}</p>
          )}

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
                {section.bullets?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mt-2">
                    {section.bullets.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              BIOMED Innovation Pharmaceuticals (Pvt.) Ltd
              <br />
              Phone:{' '}
              <a href="tel:+923344130451" className="text-biomed-teal hover:underline">
                +92 334-4130451
              </a>
              <br />
              Website:{' '}
              <a
                href="https://www.biomedpharmas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-biomed-teal hover:underline"
              >
                www.biomedpharmas.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPageLayout;
