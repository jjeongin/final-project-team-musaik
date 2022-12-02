const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBHFk672_NZvNJ5XvX08aw9dad9fy196WeyU2IJhSHPhYcHi1xIDCLD4xgGtLEFEBgdHLGIikmzSf-OE7WuvPkWqF5zmRGGdfQ066UZxGTke5CjI1n_huwrS-s6ABFFiJcfwwjW2BnvDni8MQY3MHnIQPulXKtSNHwSwYABLHadoNzPPV40BbGh9jUO2PQB4keM4aMiCM_yqVDc9TtwFwk74GVS3bq60g7Qr3Wbq0SDWq4I3TCFjIY2iQd0G6mLCJXYViz166LmnF_UZaMaBNJifKTcd3Mk-f3ATXvSe3J4WpA2SZH5fcM1LnuWfyugw5qp66XtZN4AWJtTi5ze";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


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

//Get Song
async function getSong(userName) {
  spotifyApi.searchArtists('No')
  .then(function(info) {
    console.log('Search artists by "No"', info.body);
  }, function(err) {
    console.error(err);
  });

  let playlists = data.body.items;
  for (let playlist of data.body.items) {
    console.log(playlist.name + ": " + playlist.id)
    console.log(playlists[playlist])

    for(let i=0; i<3;i++){
      console.log(playlists[i])
    }
  }
}



//synchronizing music player attempt
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
}).listen(12340);


app.post("/startedPlaying", function(req, res) {
  currTime = req.body.time;
  res.end();
});

app.post("/retrieveTime", function(req, res) {
  res.send(currTime);
  res.end();
});

app.post("/retrieveId", function(req, res) {
  id++;
  res.send(id.toString());
  res.end();
});



getMyData();