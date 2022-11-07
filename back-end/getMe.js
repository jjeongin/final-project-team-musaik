const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBylZuhJJUniFeFcz1CcjR6cIkw2_yt78LbfD-aZgW191ztcfA9bVDMy6W4yhCdBy8eQx3Mrfc9rrKcrgFMQVRg_NNt_ZMINLZeH9CaOorINJnT43ZBM9o6NqY2tMOVudyAB_MZtcxftuzrd_YOkg1gyW6WNGz1EMyUH6pmCPgtblnRPdHMObw4wDzwd9_qkY16VL7QeQM3Ywxl523QLlCD8OY";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//get top artists

const TOP_Artists_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`

async function getUserTopArtists(userName) {
  const { access_token } = token

  return fetch(TOP_Artists_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();