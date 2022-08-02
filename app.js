const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const https = require('https');

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res)=> {
  const url = 'https://v2.jokeapi.dev/joke/Programming';
  https.get(url, (apiRes) => {

    apiRes.on('data', (apiResData) => {
      const jokeRes = JSON.parse(apiResData);

      if (jokeRes.type === 'twopart') {
        res.render('twopart', {setup: jokeRes.setup, delivery: jokeRes.delivery});

      } else {
        res.render('onepart', {joke: jokeRes.joke});
      }
    });

  });
});

app.post('/', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3001, ()=> {
  console.log('server is up and running');
});
