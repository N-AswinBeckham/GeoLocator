const express = require('express');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.listen(3000, () =>  console.log('starting server: http://localhost:3000'));

const geocode = '123 455 667';

app.get('/', (req, res) => {
  res.render('Form');
});

app.post('/result', async function(req, res)  {

  const location = req.body.location;
  const api_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidnRoYXJ1bjAwMSIsImEiOiJjbDJnNWtqejcwMG91M2tzYm5xdjNvcmN1In0.fYPiaIq6efAQSH24eeUH1Q`;
  const fetch_res =  await fetch(api_url);
  const json = await fetch_res.json();
  const lat = json.features[0].geometry.coordinates[0];
  const long = json.features[0].geometry.coordinates[1];

  res.render('geocode', { lat: lat, long: long});

});                                
