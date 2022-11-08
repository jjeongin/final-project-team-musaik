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
    secret: "XXX",
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
  clientId: "XXX" ,
  clientSecret: "XXX",
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

app.use('/', test)

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



// app.get('/profile', (req,res) =>{
    
//     function getMyData() {
//         (async () => {
//           const me = await spotifyApi.getMe();
//           getMyTopArtists()
//         })().catch(e => {
//           console.error(e);
//         });
//       }
      
      
//       async function getMyTopArtists(userName){
//         const data = await spotifyApi.getMyTopArtists()
//         let topArtists = data.body.items;
//         let myArtists = []
//         for(let i=0; i<5;i++){
//           myArtists.push(topArtists[i].name)
          
      
//         }

//         res.send(myArtists)
      
      
//       }
       
//       getMyData();

    
// })

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



// clientId:'2a2ddce3c04344908d99af046bf27af6',
//     clientSecret:'e3b81a092f95422eba29e89172e51152',

