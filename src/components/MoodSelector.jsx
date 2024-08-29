import React from 'react';
import { useNavigate } from 'react-router-dom';
import Happy from '../assets/Happy.svg';
import Sad from '../assets/Sad.svg';
import Relaxed from '../assets/Relaxed.svg';
import '../App.css'; // Ensure this imports the CSS from App.css

const MoodSelector = ({ onMoodSelect }) => {
  const navigate = useNavigate();

  const moods = [
    { mood: 'Happy', icon: Happy, className: 'red' },
    { mood: 'Sad', icon: Sad, className: 'blue' },
    { mood: 'Relaxed', icon: Relaxed, className: 'green' },
  ];

  const handleMoodClick = (mood) => {
    onMoodSelect(mood);
    navigate(`/tracklist/${mood}`);
  };

  return (
    <div className="cards">
      {moods.map(({ mood, icon, className }) => (
        <div
          key={mood}
          className={`card ${className}`}
          onClick={() => handleMoodClick(mood)}
        >
          <img src={icon} alt={mood} className="card-image" />
          <p className="second-text">{mood}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;
