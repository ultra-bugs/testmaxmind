//git
//const updater = require('./db-downloader.js')
const express = require('express');

const app = express();

/*
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
const client = new WebServiceClient('530667', 'eUvNCKA9SwdtNdQj');

client.insights('2400:8901::f03c:92ff:fe9b:edd5').then(response => {
  console.log(response);
  console.log(response.country.isoCode); // 'CA'
  console.log(response.postal.code); // 'M5S'
  console.log(response.traits.userType); // 'school'
}).catch(err => {
  console.log(err);
});
*/


const r = require('./modules/geodb');
console.log(r('2400:8901::f03c:92ff:fe9b:edd5'))
console.log(r('2400:8901::f03c:92ff:fe9b:edd5'))



app.get('/', (req, res) => {
  //console.log(req);
  res.send('<h1>Hello Express app!</h1>\n This product includes GeoLite2 data created by MaxMind, available from <a href="https://www.maxmind.com">https://www.maxmind.com</a>.')
});

app.get('/query/:ip', (req, res) => {
  //console.log(req);
  let ip = req.params.ip;
  console.log(req.params.ip);
  res.send(r(ip));
});

app.get('/dbfile/:type', (req, res) => {
  let type = req.params.type;
  if (type !== 'asn' && type !== 'city') {
    res.send('Invalid request');
  } else {
    require('./db-downloader.js').maxmind(type).finally(
      () => {
        let tarFilename = type === 'asn' ? './data/GeoLite2-ASN.mmdb' : './data/GeoLite2-City.mmdb';
        res.download(tarFilename);
      }
    );
  }
});

app.listen(3000, () => {
  console.log('server started');
});

