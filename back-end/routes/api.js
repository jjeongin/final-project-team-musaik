const router = require('express').Router();

/*

Acceptance criteria: user can create a listening session, save current song, access tokens of users who have joined, access token of host user.

-get host’s current playback state: playback = spotifyApi.getMyCurrentPlaybackState()
-playback.item.uri is the uri of the current song
-a “radio session” is the host user’s access token, current playing song, joined users’
access tokens
-on change in host’s currentPlaybackState,
-for each user access access token in “radio session” users list,
spotifyAPI.addToQueue(playback.item.uri)

*/


router.post('/createSession', async (req, res) => { 
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

router.post('/getSession', (req, res) => {
    const session = req.session.session;
    res.json({
        session: session
    });
});

router.post('/changeSong', async (req, res) => {
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