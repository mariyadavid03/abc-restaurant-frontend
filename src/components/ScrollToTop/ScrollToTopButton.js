import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Create this CSS file for styling

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) { // Show the button after scrolling 300px
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {showButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          ^
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;