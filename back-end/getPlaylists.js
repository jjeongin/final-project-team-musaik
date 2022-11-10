const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDJqXuS37TLYBLcOSIxp6qL2KquWEQ3MAgQ8apZlSiQqZM9LXwhoNkFQWG_XwYZ_04niW7cWmutrImGyKuGwFXnkuWKJtpHcyTpJO2aGGWVk5J9iweqHZvHGS5hwP9_yEDI_dXNGPZZ_-gt374_r_1sq6pT13neDUh3mle5yms9OpXUu6VJw1NU-IweRiAWQVbDbL04bd_jArwB6wPrQ-9cQaWiPEhzhaopuNsAXoO1uZZ7P5-QkvZWyLWg8684cbTudri-aTJS1j8xXzyvvCrCGSBuaA69-IPQ8ABPRB9JY_61y2wNI12XUVcZaKbS6Fs0jqEqO2dbM2H-rWE9";

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

  



    // let playlists = await getPlaylist(playlist.id, playlist.name);

    // const playlistsJSON = { playlists }
    // let data = JSON.stringify(playlistsJSON)
    // fs.writeFileSync(playlist.name+'.json', data);
  }

    

// async function getPlaylist(playlistId, playlistName) {

//   const data = await spotifyApi.getPlaylist(playlistId, {
//     offset: 1,
//     limit: 10,
//     fields: 'items'
//   })
// }



  



getMyData();