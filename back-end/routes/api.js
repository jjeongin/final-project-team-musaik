const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.post('/create-session', async (req, res) => { 
    const host = req.session.user;

    const playlist = req.body.playlistId;

    const session = {
        host: host,
        playlist: playlist,
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

router.post('/join-session', (req, res) => {
    const session = req.session.session; // get clicked session
    // session.joined_users.append(req.session.user); // send request to database to add current user to the joined user list
    res.json({
        session: session
    });
});

router.post('/change-song', async (req, res) => {
    const session = req.session.session;
    const users = session.joined_users;
    const host = session.host;

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://localhost:8080/callback/'
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

router.get('/playlist-search', async (req, res) => {
    const user = req.session.user;

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://localhost:8080/callback/'
    });

    spotifyApi.setAccessToken(user.access_token);
    spotifyApi.setRefreshToken(user.refresh_token);

    const userInfo = await spotifyApi.getMe();
    const playlistsRes = await spotifyApi.getUserPlaylists(userInfo.body.id);
    const playlists = playlistsRes.body.items;

    const playlistsArray = [];

    playlists.forEach((playlist) => {
        playlistsArray.push({
            name: playlist.name,
            id: playlist.id,
            img: playlist.images[0].url
        });
    });
    res.json(playlistsArray);

});

module.exports = router;







