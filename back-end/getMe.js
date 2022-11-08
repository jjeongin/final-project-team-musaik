const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "XXX"

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    // getUserPlaylists(me.body.id);
    getMyTopArtists()
    // console.log(me.body.id)
  })().catch(e => {
    console.error(e);
  });
}


async function getMyTopArtists(userName){
  const data = await spotifyApi.getMyTopArtists()
  let topArtists = data.body.items;
  for(let i=0; i<5;i++){
    console.log(topArtists[i])

  }


}
 
getMyData();

