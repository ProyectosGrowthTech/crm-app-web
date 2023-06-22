import React from 'react';

interface CarouselProps {
  handleSectionChange: (section: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ handleSectionChange }) => {
  return (
    <div className="carousel">
      <div className="carousel-item" onClick={() => handleSectionChange('home')}>
        Home
      </div>
      <div className="carousel-item" onClick={() => handleSectionChange('invoices')}>
        Invoices
      </div>
      <div className="carousel-item" onClick={() => handleSectionChange('contact')}>
        Contact
      </div>
    </div>
  );
};

export default Carousel;
