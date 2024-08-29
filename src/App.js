import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoodSelector from './components/MoodSelector';
import MusicPlayer from './components/MusicPlayer';
import TrackList from './components/TrackList';
import Intro from './components/Intro';
import WebPlayback from './WebPlayback'; // Import WebPlayback component
import './App.css';

const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";

const App = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const authParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
          },
          body: 'grant_type=client_credentials',
        };

        const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
        if (!response.ok) {
          console.error('Error fetching access token:', response.status);
          return;
        }

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const fetchTracks = async (mood) => {
    if (!accessToken) {
      console.error('No access token available');
      return;
    }

    const moodPlaylists = {
      Happy: '37i9dQZF1DXdPec7aLTmlC',
      Sad: '37i9dQZF1DX7qK8ma5wgG1',
      Relaxed: '37i9dQZF1DWU0ScTcjJBdj',
    };

    const playlistId = moodPlaylists[mood];
    if (!playlistId) {
      console.error('Invalid mood:', mood);
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error('Error fetching tracks:', response.status);
        return;
      }

      const data = await response.json();
      const fetchedTracks = data.items.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        cover: item.track.album.images[0].url,
      }));
      setTracks(fetchedTracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentTrack(null);
    fetchTracks(mood);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  return (
    <div className="app">
      {showIntro ? (
        <Intro onAnimationEnd={handleIntroEnd} />
      ) : (
        <>
          <h1>Select Your Mood</h1>
          <MoodSelector onMoodSelect={handleMoodSelect} />
          <Routes>
            <Route path="/" element={<Navigate to={selectedMood ? `/tracklist/${selectedMood}` : '/'} />} />
            <Route path="/tracklist/:mood" element={<TrackList tracks={tracks} onTrackSelect={handleTrackSelect} />} />
          </Routes>
          {currentTrack && <MusicPlayer track={currentTrack} />}
          {accessToken && <WebPlayback accessToken={accessToken} />} {/* Add WebPlayback component */}
        </>
      )}
    </div>
  );
};

export default App;
