const axios = require('axios');
const express = require('express');
const app = express();

app.get('/oauth', function (req, res) {
  const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token'
  const CLIENT_ID = '7a6626dc6ed491f3fc04'
  const CLIENT_SECRET = 'd0cb8ebc1c7ea927e033779414afb31f6ab8deaf'
  const CODE = req.query.code

  axios({
    method: 'post',
    url: GITHUB_AUTH_ACCESSTOKEN_URL,
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: CODE
    }
  })
  .then(function (response) {
    const token = response.data.split('&')[0].replace('access_token=', '');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.status(200).jsonp(token);
  })
  .catch(function (error) {
    console.error('Error ' + error.message)
  })
});

app.listen(3000, function () {
  console.log('oauth listening on port 3000!');
});


