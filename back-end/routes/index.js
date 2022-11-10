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
          getPlaylists()
        })().catch(e => {
          console.error(e);
        });
      }
      
      
      async function getPlaylists(userName){
        const data = await spotifyApi.getPlaylists()
        let playlists = data.body.items;
        let myPlaylists = []
        
          myPlaylists.push(playlists[i].name)
          console.log(playlists[i])
      
        

        res.json(myPlaylists)
      
      
      }
        console.log(';')
      getMyData();
})

module.exports = router