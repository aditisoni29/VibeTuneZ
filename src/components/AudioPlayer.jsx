// src/components/AudioPlayer.js
import React from 'react';

const AudioPlayer = ({ audioSrc }) => {
  return (
    <div>
      <audio id="audioPlayer" controls>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;