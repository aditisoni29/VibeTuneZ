import React, { useState, useEffect } from 'react';

const defaultTrack = {
    name: "No Track",
    album: {
        images: [{ url: "https://via.placeholder.com/150" }]
    },
    artists: [{ name: "Unknown Artist" }]
};

function WebPlayback({ accessToken }) {
    const [isPaused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [currentTrack, setTrack] = useState(defaultTrack);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const playerInstance = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            setPlayer(playerInstance);

            playerInstance.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            playerInstance.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            playerInstance.addListener('player_state_changed', (state) => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track || defaultTrack);
                setPaused(state.paused);

                playerInstance.getCurrentState().then((state) => {
                    setActive(!!state);
                });
            });

            playerInstance.connect();
        };

        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, [accessToken]);

    if (!isActive) {
        return (
            <div className="container">
                <div className="main-wrapper">
                    <b>Instance not active. Transfer your playback using your Spotify app.</b>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="main-wrapper">
                    <img src={currentTrack.album.images[0]?.url || "https://via.placeholder.com/150"} 
                         className="now-playing__cover" alt="Album Cover" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{currentTrack.name || "No Track"}</div>
                        <div className="now-playing__artist">{currentTrack.artists[0]?.name || "Unknown Artist"}</div>

                        <button className="btn-spotify" onClick={() => { player.previousTrack(); }}>
                            &lt;&lt;
                        </button>

                        <button className="btn-spotify" onClick={() => { player.togglePlay(); }}>
                            {isPaused ? "PLAY" : "PAUSE"}
                        </button>

                        <button className="btn-spotify" onClick={() => { player.nextTrack(); }}>
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default WebPlayback;
