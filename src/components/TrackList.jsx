import React from 'react';

const TrackList = ({ mood, tracks, onTrackSelect }) => {
  return (
    <div className="track-list">
      <h2>{mood} Tracks</h2>
      {tracks.map((track) => (
        <div key={track.id} className="track" onClick={() => onTrackSelect(track)}>
          <img src={track.cover} alt={track.title} />
          <h4>{track.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default TrackList;