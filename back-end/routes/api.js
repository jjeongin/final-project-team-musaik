const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.post('/create-session', async (req, res) => { 
    const host = req.session.user;

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi.setAccessToken(host.access_token);
    spotifyApi.setRefreshToken(host.refresh_token);

    const playback = await spotifyApi.getMyCurrentPlaybackState();
    const currentSong = playback.body.item.uri;


    const session = {
        host: host,
        currentSong: currentSong,
        joined_users: []
    };

    req.session.session = session;

    res.json({
        session: session
    });
});

router.post('/get-session', (req, res) => {
    const session = req.session.session;
    res.json({
        session: session
    });
});

router.post('/change-song', async (req, res) => {
    const session = req.session.session;
    const users = session.joined_users;
    const host = session.host;

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi.setAccessToken(host.access_token);
    spotifyApi.setRefreshToken(host.refresh_token);

    const playback = await spotifyApi.getMyCurrentPlaybackState();
    const currentSong = playback.body.item.uri;

    session.currentSong = currentSong;

    users.forEach(async (user) => {
        spotifyApi.setAccessToken(user.access_token);
        spotifyApi.setRefreshToken(user.refresh_token);
        await spotifyApi.addToQueue(session.currentSong);
    });

    res.json({
        session: session
    });

});

module.exports = router;