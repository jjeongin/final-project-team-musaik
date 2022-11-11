const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.post('/pin-playlists', async (req, res) => { 
    const user = req.session.user;
    const spotifyApi = new SpotifyWebApi ({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    })
    spotifyApi.setAccessToken(user.access_token);
    spotifyApi.setRefreshToken(user.refresh_token);



    const me = await spotifyApi.getMe();    
    console.log(me.body);
    const playlist = await spotifyApi.getUserPlaylists(me.body.id);

      
        console.log("---------------+++++++++++++++++++++++++")
        let playlists = playlist.body.items;
      
        for(let i=0; i<3;i++){
          console.log(playlists[i])
      
      }
       res.json({
        playlists:playlists
       })
       

});

    













const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
     console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = data.body.items;

  for (let playlist of data.body.items) {
    
    console.log(playlist.name + ": " + playlist.id)
  //console.log(playlists[playlist])

  // for(let i=0; i<3;i++){
  //   console.log(playlists[i])

  }

}

  



getMyData();