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

app.get('/api/rec', (req, res) =>{

    spotifyApi.setAccessToken("BQDZilz37mSQEZ8AzgRXlrymFL_bHGnTWVHlOp9PAylB8y4sH0WgnKU33Qlq0ULwRgxqkQSXcOmwUii_bcDkxGTJNlbzLYsY9Oe7BrhnqHOPAskISu7G0eLwRzcntqEm36wuBCC-S9O8LpklmecMa-L0xjd9vOq7E2o5bpWRqmJZ115qBNbmd7MKYOrJs5Y-BD0yEyFhZvCbImjhpY4bkxLZ00VBZUHrmHwJHHY-dsw-dRWBMNkV2klE2zgm-iZ2JU0QY18MzkkyD0ma4kg-qLXh5w2PW8ScZ3ktvuZcF20uh2riSj-JpYs15yAz3RVjVfj6i3v05x6uRSTainge");
    spotifyApi.setRefreshToken("AQBiRUMbyeA2lqnDcwbjClW13zF05qGsMhHEzPGwQxXI0pcvtslZrRSobcGEdbe7dFef9-abADDuMY15zdd6sSWZpNxeCr30T4UC3_EJTrIQqV08jhNPfWS43AyY6w6wTKo");
   spotifyApi.getMe()
    spotifyApi.getAvailableGenreSeeds()
  .then(function(data) {
    let genreSeeds = data.body;
    console.log(genreSeeds);
    res.json(genreSeeds)
  }, function(err) {
    console.log('Something went wrong!', err);
  });

})

app.get('/api/user_info', (req,res) =>{
    spotifyApi.setAccessToken("BQDZilz37mSQEZ8AzgRXlrymFL_bHGnTWVHlOp9PAylB8y4sH0WgnKU33Qlq0ULwRgxqkQSXcOmwUii_bcDkxGTJNlbzLYsY9Oe7BrhnqHOPAskISu7G0eLwRzcntqEm36wuBCC-S9O8LpklmecMa-L0xjd9vOq7E2o5bpWRqmJZ115qBNbmd7MKYOrJs5Y-BD0yEyFhZvCbImjhpY4bkxLZ00VBZUHrmHwJHHY-dsw-dRWBMNkV2klE2zgm-iZ2JU0QY18MzkkyD0ma4kg-qLXh5w2PW8ScZ3ktvuZcF20uh2riSj-JpYs15yAz3RVjVfj6i3v05x6uRSTainge");
    spotifyApi.setRefreshToken("AQBiRUMbyeA2lqnDcwbjClW13zF05qGsMhHEzPGwQxXI0pcvtslZrRSobcGEdbe7dFef9-abADDuMY15zdd6sSWZpNxeCr30T4UC3_EJTrIQqV08jhNPfWS43AyY6w6wTKo");
   spotifyApi.getMe()
  .then(function(data) {
    res.json(data.body)
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})


app.get('/api/get_saved', (req, res) =>{
    spotifyApi.setAccessToken("BQDZilz37mSQEZ8AzgRXlrymFL_bHGnTWVHlOp9PAylB8y4sH0WgnKU33Qlq0ULwRgxqkQSXcOmwUii_bcDkxGTJNlbzLYsY9Oe7BrhnqHOPAskISu7G0eLwRzcntqEm36wuBCC-S9O8LpklmecMa-L0xjd9vOq7E2o5bpWRqmJZ115qBNbmd7MKYOrJs5Y-BD0yEyFhZvCbImjhpY4bkxLZ00VBZUHrmHwJHHY-dsw-dRWBMNkV2klE2zgm-iZ2JU0QY18MzkkyD0ma4kg-qLXh5w2PW8ScZ3ktvuZcF20uh2riSj-JpYs15yAz3RVjVfj6i3v05x6uRSTainge");
    spotifyApi.setRefreshToken("AQBiRUMbyeA2lqnDcwbjClW13zF05qGsMhHEzPGwQxXI0pcvtslZrRSobcGEdbe7dFef9-abADDuMY15zdd6sSWZpNxeCr30T4UC3_EJTrIQqV08jhNPfWS43AyY6w6wTKo");
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

    spotifyApi.setAccessToken("BQDZilz37mSQEZ8AzgRXlrymFL_bHGnTWVHlOp9PAylB8y4sH0WgnKU33Qlq0ULwRgxqkQSXcOmwUii_bcDkxGTJNlbzLYsY9Oe7BrhnqHOPAskISu7G0eLwRzcntqEm36wuBCC-S9O8LpklmecMa-L0xjd9vOq7E2o5bpWRqmJZ115qBNbmd7MKYOrJs5Y-BD0yEyFhZvCbImjhpY4bkxLZ00VBZUHrmHwJHHY-dsw-dRWBMNkV2klE2zgm-iZ2JU0QY18MzkkyD0ma4kg-qLXh5w2PW8ScZ3ktvuZcF20uh2riSj-JpYs15yAz3RVjVfj6i3v05x6uRSTainge");
    spotifyApi.setRefreshToken("AQBiRUMbyeA2lqnDcwbjClW13zF05qGsMhHEzPGwQxXI0pcvtslZrRSobcGEdbe7dFef9-abADDuMY15zdd6sSWZpNxeCr30T4UC3_EJTrIQqV08jhNPfWS43AyY6w6wTKo");

    
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

