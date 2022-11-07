// require('dotenv').config({ path: 'config.env' });
// var SpotifyWebApi = require('spotify-web-api-node');
// const cors = require('cors');

// // database setup
// //require('./db');
// //const mongoose = require('mongoose');

// // express
// const express = require('express');
// const app = express();


// //middleware
// app.use(express.json());
// app.use(cors());

// // static files
// const path = require("path");

// // body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // routes
// //app.use('/api', require('./routes/api'));


// // for deployment, ignore
// if (process.env.NODE_ENV == 'production') {
//     console.log(__dirname);
//     app.use(express.static(path.join(__dirname, '../front-end/build')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
//     });
// } else {
//     // development
//     app.get('/', (req, res) => {
//         res.send(process.env.NODE_ENV);
//     });
// }

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });




// // This file is copied from: https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js

// const scopes = [
//     'ugc-image-upload',
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-read-currently-playing',
//     'streaming',
//     'app-remote-control',
//     'user-read-email',
//     'user-read-private',
//     'playlist-read-collaborative',
//     'playlist-modify-public',
//     'playlist-read-private',
//     'playlist-modify-private',
//     'user-library-modify',
//     'user-library-read',
//     'user-top-read',
//     'user-read-playback-position',
//     'user-read-recently-played',
//     'user-follow-read',
//     'user-follow-modify'
//   ];
  
// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//     clientId: '916ccfa1c6494c258979b38d9a540ea8',
//     clientSecret: '463201981ff0483aa5361b4d5039113b',
//     redirectUri: 'http://localhost:8888/callback'
//   });
  
  
//   app.get('/login', (req, res) => {
//     res.redirect(spotifyApi.createAuthorizeURL(scopes));
//   });
  
//   app.get('/callback', (req, res) => {
//     const error = req.query.error;
//     const code = req.query.code;
//     const state = req.query.state;
  
//     if (error) {
//       console.error('Callback Error:', error);
//       res.send(`Callback Error: ${error}`);
//       return;
//     }
  
//     spotifyApi
//       .authorizationCodeGrant(code)
//       .then(data => {
//         const access_token = data.body['access_token'];
//         const refresh_token = data.body['refresh_token'];
//         const expires_in = data.body['expires_in'];
  
//         spotifyApi.setAccessToken(access_token);
//         spotifyApi.setRefreshToken(refresh_token);
  
//         console.log('access_token:', access_token);
//         console.log('refresh_token:', refresh_token);
  
//         console.log(
//           `Sucessfully retreived access token. Expires in ${expires_in} s.`
//         );
//         res.send('Success! You can now close the window.');
  
//         setInterval(async () => {
//           const data = await spotifyApi.refreshAccessToken();
//           const access_token = data.body['access_token'];
  
//           console.log('The access token has been refreshed!');
//           console.log('access_token:', access_token);
//           spotifyApi.setAccessToken(access_token);
//         }, expires_in / 2 * 1000);
//       })
//       .catch(error => {
//         console.error('Error getting Tokens:', error);
//         res.send(`Error getting Tokens: ${error}`);
//       });
//   });
  
//   app.listen(8888, () =>
//     console.log(
//       'HTTP Server up. Now go to http://localhost:8080/login in your browser.'
//     )
//   );