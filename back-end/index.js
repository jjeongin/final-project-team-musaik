require('dotenv').config({ path: 'config.env' });
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const session = require('express-session');

const test = require('./routes/index.js')

// database setup
//require('./db');
//const mongoose = require('mongoose');


const app = express();


//middleware
app.use(express.json());
const corsOptions = {
   optionsSuccessStatus: 200,
   credentials: true,
 }
app.use(cors(corsOptions));
app.use(session({
    secret: "e3b81a092f95422eba29e89172e51152",
    resave: false,
    saveUninitialized: false,
    
    cookie: {
        secure: false,
    }
}))

// static files
const path = require("path");

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
//app.use('/api', require('./routes/api'));


// spotify api
const spotifyApi = new SpotifyWebApi({
  clientId: "2a2ddce3c04344908d99af046bf27af6" ,
  clientSecret: "e3b81a092f95422eba29e89172e51152",
  redirectUri: 'http://localhost:8080/callback/'
});

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify'
];

// login
app.get('/auth', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// app.use('/api/profile', test)


// app.use('/profile', test)

// callback
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.redirect('/login');
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            req.session.user = {
                access_token: access_token,
                refresh_token: refresh_token
            };
        
            console.log('user:', req.session.user);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.redirect("/profile");
        })
});

app.get('/api/get_saved', (req, res) =>{
    spotifyApi.setAccessToken("BQAQ4-xSMaB9Bv7u8MEQBCW0TkPz_ss-JbXBfgvfPHeN3XbXXnP-kMGo3O54SV_bftCp22ciatMjmmqSsoFM_WpPVX99dQtl-s4azNlsSGo--BPFhUqGN7X8qmo7YebikriZXatlqL1fG5WRkd86sSotf0qm6nGYR3Ky6u2CLORG3xavFpjnC9rwKjb7qkhMBBD5DPNEAEZT3sgvKZ4wJGZTs7OJCkKt26Z2aRKHduclu0U31MylBWs3UZl_cXZCx_hShWlkI6EMJfahottqw6BpMjIv-4MbkjeX4RQOeNRHisBbCKrlbXaPgKKx6eqrMHprQyivn0Cr9sn7b-YL");
    spotifyApi.setRefreshToken("AQCddjzAWY6RLM_629Uxpzb7c_dPXVtysYc2K6FAUMXlMqJTvrzVdZe8u89rej57rFhtm9caquYLqpxySE2H37RIOwcDoIf96fPpe3eFxMLVEUHEpEb7xvIlMjAeqkiqfEU");

    spotifyApi.getMyRecentlyPlayedTracks({
        limit : 5
      }).then(function(data) {
        let songs =[]
        let images  = []
        let song = data.body.items 
        for(let i=0; i<5;i++){
            //songs.push(song[i].track['album']['artists'][0].name) returns names of recently played
            // songs.push(song[i].track.name)
            images.push(song[i].track.album.images[0].url)

        
        
          }
          res.json(images)

    
      })

         
           

    
    
})


app.get('/api/profile', (req,res) =>{
 
    // const host = req.session.user;

    // const spotifyApi = new SpotifyWebApi({
    //     clientId: "2a2ddce3c04344908d99af046bf27af6",
    //     clientSecret: "e3b81a092f95422eba29e89172e51152",
    //     redirectUri: 'http://localhost:8080/callback/'
    // });

    // // spotifyApi.setAccessToken(host.access_token);
    // spotifyApi.setRefreshToken(host.refresh_token);

    spotifyApi.setAccessToken("BQCjCzEDXl89l_lkEOZmadTloupU2FlOApWiwEmeBfnI7JF9SG5k2cLwmWaKzGlg1vKYFAGjy-UAfSgvaIn4yzOo4EOBy6EK7xA0_qWtQ9oKVVXl2JMDJdtwgpLZojkFxY7LC_axtxffRlO2K2C-oSSHjpzpp0Yfrbf5sd5Tmhz5YjhYc4YnUQ6v8PFpo4UEtQ6baU_bPuInl2NJWlFoNcQTS6vD-Ohmof56aUrEATKqZ3OEaAMMQcCIjhVCF1WSCRAte1UvGz6Iq9QbRWraoYNTObNoO1cpxyU_QEA2yfo6rurDkG2ISnJOelAJj3vdpkD4ZJKgHFEW0WjSgoda");
    spotifyApi.setRefreshToken("AQA0xr6AOWGPZiE9H75NXfIr_Ivw-HC05mQKCIo2wxH6Fh0ozUaVoBTY5-2sjdw8Psb67x4rz8N44Vdh3X0Xp82WpD3SsbPlnp9vxWr8h6AdxBnIteN8xdE2Yosk2UdjqGo");

    
    function getMyData() {
        (async () => {
          const me = await spotifyApi.getMe();
          getMyTopArtists()
        })().catch(e => {
          console.error(e);
        });
      }
      
      
      async function getMyTopArtists(userName){
        const data = await spotifyApi.getMyTopArtists()
        let topArtists = data.body.items;
        let myArtists = []
        for(let i=0; i<5;i++){
          myArtists.push(topArtists[i].images[0]["url"])
          
      
        }

        res.json(myArtists)
   
      
      }
       
      getMyData();

    
})

// app.get('/api/profile', (req,res) =>{
//     function getMyData() {
//             (async () => {
//               const me = await spotifyApi.getMe();
//               getMyTopArtists()
//             })().catch(e => {
//               console.error(e);
//             });
//           }
          
          
//           async function getMyTopArtists(userName){
//             const data = await spotifyApi.getMyTopArtists()
//             let topArtists = data.body.items;
//             let myTopArtists = []
//             for(let i=0; i<5;i++){
//               myTopArtists.push(topArtists[i].name)
//               console.log(topArtists[i])
          
//             }
    
//             res.json(myTopArtists)
          
          
//           }
           
//           getMyData();
    
// })

// refresh
app.get('/refresh', (req, res) => {
    const refreshToken = req.session.user.refresh_token;
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.refreshAccessToken().then(
        data => {
            req.session.user = {
                access_token: data.body.access_token,
                refresh_token: refreshToken,
            };
            res.send(req.session.user).status(200);
        }
    ).catch(
        err => {
            console.log(err);
            res.sendStatus(400);
        }
    );
});



// for deployment, ignore
if (process.env.NODE_ENV == 'production') {
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, '../front-end/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../front-end', 'build', 'index.html'));
    });
} else {
    // development
    app.get('/', (req, res) => {
        res.send(process.env.NODE_ENV);
    
    });
}




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});



// clientId:'2a2ddce3c04344908d99af046bf27af6',
//     clientSecret:'e3b81a092f95422eba29e89172e51152',

