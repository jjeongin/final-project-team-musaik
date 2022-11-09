const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/', (req,res) =>{
    const host = req.session.user;
    const spotifyApi = new SpotifyWebApi({
        clientId: "XXX",
        clientSecret: "XXX",
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi.setAccessToken(host.access_token);
    spotifyApi.setRefreshToken(host.refresh_token);
    function getMyData() {
        (async () => {
          const me = await spotifyApi.getMe();
          getMyTopArtists()
        })().catch(e => {
          console.error(e);
        });
      }
      
      async function getMyTopArtists(){
        const data = await spotifyApi.getMyTopArtists({
            limit: 3,
            offset: 0,
            time_range: 'long_term'
          })
          .then(function(data) {
            let topArtists = data.body.items;
            res.send(topArtists);
      })
    }
})

module.exports = router