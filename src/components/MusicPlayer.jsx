// src/components/MusicPlayer.js
import React, { useRef, useEffect } from 'react';

const MusicPlayer = ({ track }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      if (track) {
        audioElement.src = track.url;
        audioElement.load();
        audioElement.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioElement.pause();
        audioElement.src = '';
      }
    }
  }, [track]);

  return (
    <div className="music-player">
      {track ? (
        <>
          <h2>Now Playing: {track.title}</h2>
          <img src={track.cover} alt={track.title} />
          <audio ref={audioRef} controls>
            Your browser does not support the <code>audio</code> element.
          </audio>
        </>
      ) : (
        <p>Select a track to play.</p>
      )}
    </div>
  );
};

export default MusicPlayer;