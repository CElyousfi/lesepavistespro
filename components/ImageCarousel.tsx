'use client';

import { useEffect, useRef } from 'react';

const ImageCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        
        // Reset when reaching the end
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  // Placeholder images - you'll replace these with real images
  const images = [
    { id: 1, title: 'Optimisez vos charges sociales', type: 'illustration' },
    { id: 2, title: '+250 Entreprises accompagnées', type: 'stat' },
    { id: 3, title: 'Optimisez votre fiscalité locale et énergie', type: 'illustration' },
    { id: 4, title: 'Faites des économies sur vos assurances', type: 'illustration' },
    { id: 5, title: 'Expert comptable', type: 'photo' },
    // Duplicate for seamless loop
    { id: 6, title: 'Optimisez vos charges sociales', type: 'illustration' },
    { id: 7, title: '+250 Entreprises accompagnées', type: 'stat' },
    { id: 8, title: 'Optimisez votre fiscalité locale et énergie', type: 'illustration' },
  ];

  return (
    <div className="relative overflow-hidden py-8 bg-brand-navy">
      {/* Boxed container matching hero width */}
      <div className="container mx-auto px-[5%]">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden max-w-6xl mx-auto"
          style={{ scrollBehavior: 'auto' }}
        >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-48 bg-white rounded-2xl shadow-md flex items-center justify-center p-6"
          >
            {image.type === 'stat' ? (
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-navy mb-2">+250</div>
                <div className="text-sm text-gray-600">Entreprises accompagnées</div>
              </div>
            ) : image.type === 'illustration' ? (
              <div className="text-center">
                {/* Placeholder for illustration - you'll add actual SVG/image */}
                <div className="w-24 h-24 bg-pastel-beige rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-12 h-12 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 font-medium">{image.title}</p>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg"></div>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
