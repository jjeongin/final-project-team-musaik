const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAaAMoTkiWh_bUsiPSP096UCenPLjs59NyfHZ8Cyk3lWAgFuFqttAoo9-6PqQxfxcdq9xICHVc4NgFSAsY2k_NtIPV-esM5c8oy9AijwYcJRPQKzaQ1ZiqqUNOhjwH35BIt90SSGagKdxLtZ8_BUlDdRtwHJWgfX9YoQaqp8aNo9EBItSyhxvmcOCsxA6f2qoRYS1J_yls9IkvU1nz7cmjUSISrLlhOFFUJ8b0ptjTU6-acoUNqV3RBCdkUgQzSgV4KQLQkGjI7OaOQNkVN7oe4X4mzluCrNzXJs7ywcWx20qqTSAojpJSydR0uk_BxKnr0_3SA09RGocZ28CuN"

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

