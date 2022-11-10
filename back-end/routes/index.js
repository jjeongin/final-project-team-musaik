const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/api/profile', (req,res) =>{
    const host = req.session.user;

    const spotifyApi = new SpotifyWebApi({
      clientId: "XXX" ,
      clientSecret: "XXX",
      redirectUri: 'http://localhost:8080/callback/'
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
        const data = await spotifyApi.getMyTopArtists()
        let topArtists = data.body.items;
        let myTopFive = []

        for(let i = 0; i< 4; i++){
          myTopFive.push(topArtists[i])
        }

        res.json(myTopFive)
 
      }
      getMyData();
})

module.exports = router