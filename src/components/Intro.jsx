// src/components/Intro.jsx
import React, { useEffect, useState } from 'react';
import '../App.css'; // Correct path to App.css

const Intro = ({ onAnimationEnd }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onAnimationEnd();
      }, 2000); // Duration of the zoom effect
      return () => clearTimeout(timer);
    }
  }, [isAnimating, onAnimationEnd]);

  return (
    <div className={`intro ${!isAnimating ? 'fade-out' : ''}`}>
      <h1>VibeTuneZ</h1>
    </div>
  );
};

export default Intro;
