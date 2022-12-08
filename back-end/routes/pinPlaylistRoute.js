const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/pin-playlists', async (req, res) => { 
    const user = req.session.user;
    const spotifyApi = new SpotifyWebApi ({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://localhost:9000/callback/'
    })
    spotifyApi.setAccessToken(user.access_token);
    spotifyApi.setRefreshToken(user.refresh_token);



    const me = await spotifyApi.getMe();    
    console.log(me.body);
    const playlist = await spotifyApi.getUserPlaylists(me.body.id);

      
        console.log("---------------+++++++++++++++++++++++++")
        let playlists = playlist.body.items;
      
        const playlist_array =  []
        // runs loop to obtain three
        //images and place them in row
        for(let i=0; i<3;i++){

            playlist_array.push(playlists[i].images[0]["url"])

      
      }

        console.log(playlist_array)


        res.json({
        playlists:playlist_array
        })
        

});

    
module.exports = router;











